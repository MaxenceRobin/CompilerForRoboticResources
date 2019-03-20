from micropython import const
import pycom
import time
import uos
import sys

from DRV8833 import *

DRV8833_Sleep_pin = 'P5'
DRV8833_AIN1 = 'P11'
DRV8833_AIN2 = 'P12'
DRV8833_BIN1 = 'P21'
DRV8833_BIN2 = 'P22'

V_MAX = 0.6
V_MOYEN = 0.4
V_MIN = 0.2

C_g = 0
C_d = 0

Moteur_Gauche = DRV8833 (DRV8833_AIN1, DRV8833_AIN2, DRV8833_Sleep_pin, 1, 500, 0, 1)
Moteur_Droit = DRV8833 (DRV8833_BIN1, DRV8833_BIN2, DRV8833_Sleep_pin, 1, 500, 2, 3)

def Avancer_droit (vitesse) :
	global C_g
	global C_d
	Moteur_Droit.Cmde_moteur(SENS_HORAIRE, vitesse)
	Moteur_Gauche.Cmde_moteur(SENS_ANTI_HORAIRE, vitesse)
	C_g = 1
	C_d = 1

def Reculer_droit (vitesse) :
	global C_g
	global C_d
	Moteur_Droit.Cmde_moteur(SENS_ANTI_HORAIRE, vitesse)
	Moteur_Gauche.Cmde_moteur(SENS_HORAIRE, vitesse)
	C_g = -1
	C_d = -1

def Pivoter_droite (vitesse) :
	global C_g
	global C_d
	Moteur_Droit.Cmde_moteur(SENS_ANTI_HORAIRE, vitesse)
	Moteur_Gauche.Cmde_moteur(SENS_ANTI_HORAIRE, vitesse)
	C_g = 1
	C_d = -1

def Pivoter_gauche (vitesse) :
	global C_g
	global C_d
	Moteur_Droit.Cmde_moteur(SENS_HORAIRE, vitesse)
	Moteur_Gauche.Cmde_moteur(SENS_HORAIRE, vitesse)
	C_g = -1
	C_d = 1

def Arret () :
	Moteur_Droit.Arret_moteur()
	Moteur_Gauche.Arret_moteur()

from VL6180X import *
Distance = [-1, -1, -1]
Luminosite = [-1.0, -1.0, -1.0]

d_Thd1 = const(80)
d_Thd2 = const(200)

N_VL6180X = const(3)
VL6180X_CE_Pin = ('P6', 'P7', 'P19')
VL6180X_I2C_adr_defaut = const(0x29)
VL6180X_I2C_Adr = (const(0x2A), const(0x2B), const(0x2C))

VL6180X_GPIO_CE_Pin = []
for pin in VL6180X_CE_Pin :
	VL6180X_GPIO_CE_Pin.append(Pin(pin, mode=Pin.OUT))
	VL6180X_GPIO_CE_Pin[-1].value(0)

i2c = I2C(0, I2C.MASTER, baudrate = 400000)
adr = i2c.scan()

capteur_VL6180X = []
for i in range (N_VL6180X) :
	VL6180X_GPIO_CE_Pin[i].value(1)
	time.sleep(0.002)
	
	capteur_VL6180X.append(VL6180X(VL6180X_I2C_adr_defaut, i2c))
	capteur_VL6180X[i].Modif_Adr_I2C(VL6180X_GPIO_CE_Pin[i], VL6180X_I2C_Adr[i], VL6180X_I2C_adr_defaut)

adr = i2c.scan()

def getDistance(i) :
	distance = capteur_VL6180X[i].range_mesure()
	time.sleep(0.002)
	return distance

def getLuminosite(i) :
	luminosite = capteur_VL6180X[i].ambiant_light_mesure()
	time.sleep(0.002)
	return luminosite

def random_color():
	n = uos.urandom(3)
	color = n[0] + n[1] * 256 + n[2] * 256 * 256
	return color

pycom.heartbeat(False)

limite = 0
distance = 0
limite = 200
distance = limite
pycom.rgbled(0x33FF33)
while True :
	distance = getDistance(0)
	if distance<limite :
		Avancer_droit(((limite-distance)/limite))
	else :
		Arret()
	if distance<20 and distance>1 :
		break
time.sleep(0.5)
Arret()
pycom.rgbled(0x000000)

pycom.heartbeat(True)

import sys
sys.exit('end')