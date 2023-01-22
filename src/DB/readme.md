# The Tables

there are 4 tables that are used in this project:

- Driper_Pipes
- Drippers
- Drippers_data
- Pipes

in the rest of the page it will be shown what they have and the  
reasoning behind the structure given to them.

#

## Dripper pipes:

Dripper pipes is build like that:

- id interger (pk)
- dripper_id interger (fk)
- pipes_id interger (fk)

The dripper and the pipes are both foreign key's from the `Pipes` and the `Dripper Table`  
for every dripper there was a pipe that related to it or to some other dripper.  
In order to work with this information I had to divide the tables, but if  
I wanted to work with them I needed to get some realtion with the two of them.  
the solution was **this table**.

#

## Dripper

Dripper:

- Dripper_id interger (pk)
- Dripper_Type string

In here will be stored the Dripper serial number and it's name (type)  
a simple table created to distinguish the drippers from their data  
and the pipes.

#

## Dripper Data

Drippers_Data:

- data_id interger (pk)
- dripper_id interger (fk)
- flow_rate interger
- k interger
- pressure interger

The storage of all the relevent drippers data,  
from here alot of the calculations parmater will come.

#

## Pipes

- pipe_id interger (pk)
- Diameter interger
- (max) pressure interger
- kd interger

very similar to dripper data pourpse,  
from here are taken parameters to give to the function.
