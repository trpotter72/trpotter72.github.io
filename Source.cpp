/*
Author: Ben Sadler
Project 2
CSCI 261, Fall 2017
*/

#include <iostream>
#include <string>

using namespace std;



int main() {

	int mySticks; // the players amount of sticks he picked up
	int compSticks; // the computers amoutn of sticks it picked up
	int totalSticks; // total number of sticks left
	int turn; // Player's turn = 1; computer's turn = 2
	char repeat; //y or n on whether the player wants to play again

	do {
		cout << "Let's play a game of '23'!" << endl;

		int totalSticks = 23; // sets number of sticks to 23

		do {

			//PLAYERS TURN
			

			cout << "Your turn. Enter the number of sticks you wish to pick: ";
			cin >> mySticks;
			cout << endl;
			turn = 1;

			while ((mySticks != 1) && (mySticks != 2) && (mySticks != 3)) // if they don't chose 1 2 or 3 sticks it asks to rechoose
			{
				cout << "Wrong number of sticks. Please pick 1, 2, or 3 sticks: ";
				cin >> mySticks;
				cout << endl;
			}

			totalSticks = totalSticks - mySticks; // the equation that actually "picks up the sticks"

			if (totalSticks < 0) // so the number of sticks doesn't appear negative if they try to pick up more than what's left
			{
				totalSticks = 0;
			}
			
			cout << "You picked " << mySticks << " sticks.    " << totalSticks << " left\n\n"; // tells the amount of sticks they chose and how many are left




			//COMPUTER TURN

			if (totalSticks > 4) // if the total number of sticks is greater than 4, then the computer takes 4 and subtracts the amount the player took, and that amount is how many the computer picks up
			{
				compSticks = 4 - mySticks;
				turn = 2; //sets turn to the computer's turn

				totalSticks = totalSticks - compSticks;

				cout << "Computer picked " << compSticks << " sticks.    " << totalSticks << " left.\n\n";
			}
			else
			{
				switch (totalSticks) // each amount of sticks left that is 4 and under
				{
					case 4:
						compSticks = 3;
						turn = 2;

						totalSticks = totalSticks - compSticks;

						cout << "Computer picked " << compSticks << " sticks.    " << totalSticks << " left.\n\n";

						break;

					case 3:
						compSticks = 2;
						turn = 2;

						totalSticks = totalSticks - compSticks;

						cout << "Computer picked " << compSticks << " sticks.    " << totalSticks << " left.\n\n";

						break;

					case 2:
						compSticks = 1;
						turn = 2;

						totalSticks = totalSticks - compSticks;

						cout << "Computer picked " << compSticks << " sticks.    " << totalSticks << " left.\n\n";

						break;

					case 1:
						compSticks = 1;
						turn = 2;

						totalSticks = totalSticks - compSticks;

						cout << "Computer picked " << compSticks << " sticks.    " << totalSticks << " left.\n\n";

						break;

					case 0:
						compSticks = 0;
						turn = 1;
						break;
				}


			}


		} while (totalSticks > 0); // keeps going as long as there are more sticks left



			if (turn == 2) // if it was the computer was the last one to go, the player won
			{
				cout << "Congrats you won!\n\n";
			}
			else // if the player was the last one to go, the computer won
			{

				cout << "You picked the last stick.\nSorry, the computer beat you\n";
			}

				cout << "Do you want to play another game? <Y/N>: ";

				cin >> repeat;

			while ((repeat != 'y') && (repeat != 'Y') && (repeat != 'N') && (repeat != 'n')) // play again script
			{
				cout << "Invalid response. Please enter again <Y/N>: ";
				cin >> repeat;
				cout << endl;
			}

	} while ((repeat == 'y') || ( repeat == 'Y'));
	
	cout << endl << "Thanks for playing! Bye!\n\n";


	system("pause");
	return 0;
}





/*

if (totalSticks > 4)
{
compSticks = 4 - mySticks;
turn = 2;
}
else if (totalSticks = 4)
{
compSticks = 3;
turn = 2;
}
else if (totalSticks = 3)
{
compSticks = 2;
turn = 2;
}
else if (totalSticks = 2)
{
compSticks = 1;
turn = 2;
}
else if (totalSticks = 1)
{
compSticks = 1;
turn = 2;
}
else if (totalSticks = 0)
{
compSticks = 0;
turn = 2;
}









If there are more than 4 toothpicks left, then the computer should take 4 - x, with x being the amount the player took

If there are 2 to 4 toothpicks left, then the computer should withdraw enough toothpicks to leave 1.

If there is 1 toothpick left, then the computer has to take it and loses

Must choose 1, two or 3 sticks
*/