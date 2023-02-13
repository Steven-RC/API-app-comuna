import re 
import requests
import sys

# texto="dignidades legales de la comuna en mención, en uso de las atr¡buc¡on_es <;ue les concede el artículo 17 de la Ley de Organizaciones y Régimen de las Comunas, cumpliendo con el artículo 16 de la misma Ley y el Acuerdo ministerial N2 109 del 22 de febrero de 1938 CERTIFICA QUE TOMALA TOMALA FAVIOLA JADIRA x L Con número de C.I. 092796687-9. Está en posesión de un lote de terreno dentro de los linderos del territorio que posee la comuna desde tiempos inmemorables, con personería jurídica"
#si existe un guion, entonces buscar solo el numero de cedula



def buscarCedula(texto):
    extraer_ci=re.findall(r'\d{1,9}-\d{1,9}',texto)
    if len(extraer_ci) != 0:
        buscar_numeros=re.findall(r'\d{1,9}',extraer_ci[0])
        #unir los numeros
        unir_numeros="".join(buscar_numeros)
            # si el numero de cedula es de 10 digitos, entonces imprimirlo
        if len(unir_numeros) == 10:
            return unir_numeros
        #si no, entonces imprimir el numero de cedula manualmente
        else:
            return "No se encontro ningun numero de cedula en el texto.\nPor favor, ingrese el numero de cedula manualmente"

            
    else:
        buscar_numeros=re.findall(r'\d{1,10}',texto)
        if len(buscar_numeros) != 0:
            #recorrer la lista de numeros, y si hay un numero de 10 digitos, entonces imprimirlo
            for i in buscar_numeros:
                if len(i) == 10:
                    data = {'cedula':str(i)}
                    return i
                    break
        else:
            return "No se encontro ningun numero de cedula en el texto.\nPor favor, ingrese el numero de cedula manualmente"

print(buscarCedula(sys.argv[1]))