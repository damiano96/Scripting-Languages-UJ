# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import json


class ActionAnswerIfOpen(Action):
    def name(self) -> Text:
        return "action_answer_if_open"

    def run(self, dispatcher: CollectingDispatcher,
                        tracker: Tracker,
                        domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        request_day = ([blob['value'] for blob in tracker.latest_message['entities'] if blob['entity'] == 'day'] or ('',))[0]
        request_hour = ([blob['value'] for blob in tracker.latest_message['entities'] if blob['entity'] == 'hour'] or ('',))[0]

        data = open('informations/opening_hours.json')
        opening_data = json.load(data)
        opening_items = opening_data['items']

        hours = opening_items.get(request_day.capitalize())

        if hours is None:
            dispatcher.utter_message(text="Sorry, you entered incorrect data")
            data.close()
            return []

        if request_hour is '':
            if int(hours['open']) == 0 and int(hours['close']) == 0:
                dispatcher.utter_message(text=f"Unfortunately restaurant is close on {request_day}")
                data.close()
                return []

            dispatcher.utter_message(text=f"Yes, restaurant is open between {hours['open']} and {hours['close']} on {request_day}")
            data.close()
            return []

        if request_hour is not '':
            if int(request_hour) < 0 or int(request_hour) > 24:
                dispatcher.utter_message(text="Sorry, you entered incorrect hour")
                data.close()
                return []

            if hours['close'] > int(request_hour) > hours['open']:
                dispatcher.utter_message(text=f"Yes, restaurant is open on {request_day} at {request_hour}")
                data.close()
                return []
            else:
                dispatcher.utter_message(text=f"No, restaurant is close on {request_day} at {request_hour}")
                data.close()
                return []

        return []


class ActionAnswerShowMenuItems(Action):
    def name(self) -> Text:
        return 'action_answer_show_menu_items'

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        data = open('informations/menu.json')
        menu_data = json.load(data)
        menu_items = menu_data['items']

        list_items_menu = ["{0} - {1}zl".format(menu_item.get('name'), menu_item.get('price'))
                           for menu_item in menu_items]
        show_items_menu = "\n".join(list_items_menu)

        dispatcher.utter_message(text=show_items_menu)
        data.close()
        return []