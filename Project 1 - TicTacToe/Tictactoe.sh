#!/bin/bash

BOARD=("_" "_" "_" "_" "_" "_" "_" "_" "_")
GAME_TYPE=0
END_GAME="0"
POLE=0
PLAYER="X"

trap save_game SIGINT

function save_game() {
  echo "${BOARD[@]}" > save_game.txt
  echo "${GAME_TYPE}" >> save_game.txt
  echo "${PLAYER}" >> save_game.txt
  echo -e "\n\nPomyslnie zapisano gre!"
  exit 0
}

function restore_game() {
  FILE='save_game.txt'
  if [[ -f $FILE ]]
  then
    if [ "$(cat ${FILE} | sed -n '1p')" != "" ]
    then
      BOARD=($(cat ${FILE} | sed -n '1p'))
    fi
    if [ "$(cat ${FILE} | sed -n '2p')" != "" ]
    then
      GAME_TYPE=($(cat ${FILE} | sed -n '2p'))
    fi
    if [ "$(cat ${FILE} | sed -n '3p')" != "" ]
    then
      PLAYER=($(cat ${FILE} | sed -n '3p'))
    fi
  else
    GAME_TYPE=2
  fi
}

function show_board() {
  clear
  for i in {0..8}
  do
    if [[ $(( i % 3 )) == 0 ]] && [ "$i" -ne 0 ]
    then
      echo -e "|\n"
    fi
    echo -n "|"
    echo -n " ""${BOARD[${i}]}"" "
  done
  echo -n "|"
  echo -e "\n"
}

function check_condition() {
  if [[ ${END_GAME} -eq 0 ]]
    then
    if [[ ${BOARD[$1]} != "_" ]] && [ "${BOARD[$1]}" == "${BOARD[$2]}" ] && [ "${BOARD[$1]}" == "${BOARD[$3]}" ]
    then
      END_GAME=1
      echo "Wygral gracz "${PLAYER}
    fi

    if [[ ! "${BOARD[*]}" =~ "_" ]]
    then
      END_GAME=1
      echo "Gracze zremisowali"
    fi
  fi
}

function check_winner() {
  check_condition 0 1 2
  check_condition 0 3 6
  check_condition 0 4 8
  check_condition 1 4 7
  check_condition 2 4 6
  check_condition 2 5 8
  check_condition 3 4 5
  check_condition 6 7 8
}

function human_move() {
  do=1
  while [ $do -eq 1 ]
  do
    read -p "${PLAYER} wpisz numer pola: " POLE
    if [[ ${BOARD[${POLE}]} == "_" ]]
    then
      BOARD[${POLE}]="${PLAYER}"
      do=0
    fi
  done
}

function computer_move() {
  do=1
  while [ $do -eq 1 ]
  do
    ROUNDED_POSITION=$((1 + $RANDOM % 10))
    if [[ ${BOARD[${ROUNDED_POSITION}]} == "_" ]]
    then
      do=0
    fi
  done
  BOARD[${ROUNDED_POSITION}]="${PLAYER}"
}

function put_sign_on_board() {
  if [[ "$GAME_TYPE" -eq 1 ]]
  then
    human_move
  fi

  if [[ "$GAME_TYPE" -eq 2 ]]
  then
    game_with_computer
  fi
}

function change_player() {
  if [[ "$PLAYER" == "X" ]]
  then
    PLAYER="O"
  else
    PLAYER="X"
  fi
}

function game_with_computer() {
  if [[ "$PLAYER" == "X" ]]
  then
    human_move
  else
    computer_move
  fi
}

function start_game() {
  if [[ "$GAME_TYPE" -eq 3 ]]
  then
    restore_game
  fi

  while [ $END_GAME -eq "0" ]
  do
    show_board
    put_sign_on_board
    show_board
    check_winner
    change_player
  done
}

function welcome_menu() {
  clear
  echo "###################################################################"
  echo "#                                                                 #"
  echo "#   Witaj w grze Kolko i krzyzyk                                  #"
  echo "#   Tip 1:                                                        #"
  echo "#   Aby wybrac konkretne miejsce, trzeba podac liczbe od 0 do 8   #"
  echo "#   odpowiadaja one kolejnym komorkom na planszy                  #"
  echo "#                                                                 #"
  echo "#   Tip 2:                                                        #"
  echo "#   Aby zapisac aktualny stan rozgrywki, wcisnij CTRL+C           #"
  echo "#                                                                 #"
  echo "#   Wybierz jak chcesz zagrac                                     #"
  echo "#   1 - Gra z innym graczem                                       #"
  echo "#   2 - Gra z komputerem                                          #"
  echo "#   3 - Odtworz zapisana gre                                      #"
  echo "#                                                                 #"
  echo "###################################################################"
  read -p "Twoj wybor: " GAME_TYPE
}

while [[ "$GAME_TYPE" -ne 1 ]] && [[ "$GAME_TYPE" -ne 2 ]] && [[ "$GAME_TYPE" -ne 3 ]]
do
  welcome_menu
done

start_game
