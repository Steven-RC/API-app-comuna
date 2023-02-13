import re 
import requests
import sys

# texto="Fundada el 22 de febrero de 1938 '. N E Acuerdo Ministerial N* 109 , í u . Filial a la Federación Provincial de Comunas - “ Bambil Collao — Colonche — Santa Elena —M — BambilColao-Colonche-SanaFlena . — CERTIFICADO DE USO Y USUFRUCTO N2 443 Los firmantes y dignidades legales de la comuna en mención, en uso de las atr¡buc¡on_es <;ue les concede el artículo 17 de la Ley de Organizaciones y Régimen de las Comunas, cumpliendo con el artículo 16 de la misma Ley y el Acuerdo ministerial N2 109 del 22 de febrero de 1938 CERTIFICA QUE TOMALA TOMALA FAVIOLA JADIRA x L Con número de C.I. 092349122-9. Está en posesión de un lote de terreno dentro de los linderos del territorio que posee la comuna desde tiempos inmemorables, con personería jurídica desde el 13 de enero de 1983 con el respectivo TÍTULO DE LA PROPIEDAD, reconocido por el MINISTERIO DE AGRICULTURA Y GANADERÍA, inscrito en la notaría y registrador de la propiedad de la provincia de Santa Elena el 15 de diciembre de 1983, Art. 57 DE LA CONSTITUCIÓN DE LA REPÚBLICA DEL ECUADOR, numeral 4.- Conservar la propiedad imprescriptible de sus tierras comunitarias, que serán inalienables, inembargables e indivisibles. Estas tierras estarán exentas del pago de tasas e impuestos y habiendo cumplido el beneficio con todos los requisito y formalidad de la Ley y reglamento desde su afiliación hasta la fecha, se le confiere el presente CERTIFICADO DE USO Y USUFRUCTO con los linderos y dimensiones que a continuación se detallan. NORTE: 18 METROS CON LA CALLE | SUR: 24 METROS CON EL RIACHUELO ÉSTE: 10 METROS CON EL CAMINO VIA AL RIO OESTE: 27 METROS CON EL SR. GREGORIO TOMALÁ TOMALÁ Los integrantes del cabildo legalizan con su firma el presente CERTIFICADO DE USO Y USUFRUCTO, cuya copq_!gual al original reposa en los archivos de la comuna Bambil Collao. ; ATENTAMENTE a í Ledo. Nel /A;%r QRBNE — : T - =07 Dirío Méndez Tomalá ( —7 SRoNemge Arfhondo Torres Beltrán PUTTECOS la2 4 -PRESIDENTE Zy a= z) — Sra. trene Del Rocío Caiche Catuto N 5 _ TESORERA N A !,'.'_9(¡— Jl,_9,an¡ aredes Tomalá N EnO 19 w»./ p INDICO Sr. R Al 553%5…Ú&í:6;tuto SECRETARIO FECHA DE EMISIÓN: 07/MARZO/2021 FECHA DE CADUCIDA: 31/DICIEMBRE/2021 Casa Comunal Bambil Collao, Barrio 3 de bi = E-MAIL: 22defebf€rº©bambíl©gmaíl.com FAZ%$ZK3£Z? C:lll.::' ',r5valr1m7'º£zagay . Teléfonos: 0997397933 0981072347 — 0986863081 0979475404 0939211795 —"
#si existe un guion, entonces buscar solo el numero de cedula



def buscarDocumento(texto):
    # convertir el texto a minusculas
    texto=texto.lower()
    global tipo_documento
    # extraer la parte del texto que contenga la frase "CERTIFICADO DE USO Y USUFRUCTO"
    extraer_tipo_doc=re.findall(r"cert*.*uso.*y.*usufructo",texto)
    # si existe la frase "CERTIFICADO DE USO Y USUFRUCTO", entonces imprimir el tipo de documento
    if len(extraer_tipo_doc) != 0:
        tipo_documento="Certificado de uso y usufructo"
    else:
        return "No se encontro ningun tipo de documento en el texto.\nPor favor, ingrese el tipo de documento manualmente"

    extraer_ci=re.findall(r'\d{1,9}-\d{1,9}',texto)
    if len(extraer_ci) != 0:
        buscar_numeros=re.findall(r'\d{1,9}',extraer_ci[0])
        #unir los numeros
        unir_numeros="".join(buscar_numeros)
            # si el numero de cedula es de 10 digitos, entonces imprimirlo
        if len(unir_numeros) == 10:
            return unir_numeros, tipo_documento
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
                    return i, tipo_documento

        else:
            return "No se encontro ningun numero de cedula en el texto.\nPor favor, ingrese el numero de cedula manualmente"
    


print(buscarDocumento(sys.argv[1]))