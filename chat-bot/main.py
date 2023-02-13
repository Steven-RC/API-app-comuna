import re
import random
import sys



def get_response(user_input):
    split_message = re.split(r'\s|[,:;.?!-_]\s*', user_input.lower())
    response = check_all_messages(split_message)
    return response

def message_probability(user_message, recognized_words, single_response=False, required_word=[]):
    message_certainty = 0
    has_required_words = True

    for word in user_message:
        if word in recognized_words:
            message_certainty +=1

    percentage = float(message_certainty) / float (len(recognized_words))

    for word in required_word:
        if word not in user_message:
            has_required_words = False
            break
    if has_required_words or single_response:
        return int(percentage * 100)
    else:
        return 0

def check_all_messages(message):
        highest_prob = {}

        def response(bot_response, list_of_words, single_response = False, required_words = []):
            nonlocal highest_prob
            highest_prob[bot_response] = message_probability(message, list_of_words, single_response, required_words)

        response('Hola Mi estimad@', ['hola', 'klk', 'saludos', 'buenas','hello','hi','holq','hol'], single_response = True)

        response('Si, claro, Que puedo hacer por ti?', 
        ['tengo','puedo', 'hacerte', 'varias','una', 'pregunta', 'preguntas','quiero']
        , single_response=True)

        response('Puedes generar una lista de todos los comuneros ingresando al modulo de reportes, seccion comuneros', 
        ['generar', 'comuneros', 'lista','listado', 'reporte','crear','obtengo','obtener','creo'], single_response = True)

        response('Dirigirse a el modulo reportes, seccion cuotas anuales',
         ['como','reportes', 'anuales', 'reporte', 'de', 'sientes','lista','listar'], required_words=['cuotas'])

        response('El dia de hoy me encuentro bien, gracias por preguntar', 
        ['estas','Arturo', 'arturo', 'generar','crear', 'inactivos', 'sientes','creo']
        , required_words=['como'])

        response('Puedes aprobar un requisito de un comunero dirigiendote al modulo de registro, seccion de registro de comunero, y hacer click en el boton aprobar', 
        ['aprobar','comunero', 'como', 'de','que', 'forma', 'donde','peuedo','puede','requisitos']
        , single_response=True)
        response('Para ingresar un comunero nuevo debes dirigirte a la seccion personas del modulo de registro, y hacer click en el boton nuevo, una vez alli debes llenar los campos requeridos y hacer click en el boton guardar la persona debe aprobar varios requisitos para convertirse en comunero',  
        ['aprobar','comunero', 'registro', 'nuevo', 'como', 'de','que', 'forma', 'donde','peuedo','puede']
        , single_response=True)

        response('Buenos dias, como estas?', ['buen', 'buenos', 'dia', 'dias'], single_response=True)

        response('Bien, gracias por preguntar', ['y', 'buenos', 'dia', 'dias'], required_words=['tu'])

        response('Estoy para resolver cualquier duda que tengas',['gracias', 'te lo agradezco', 'thanks'], single_response=True)

        response('Buscar informacion comunero',['deuda','quiero','dame', 'informacion', 'comunero','cedula','busca','a','cédula','buscar','la','deudas','cuotas','debe','podrias','informacion','cuotas','de'], single_response=True)

        best_match = max(highest_prob, key=highest_prob.get)
        #print(highest_prob)

        return unknown() if highest_prob[best_match] < 1 else best_match

def unknown():
    response = ['puedes decirlo de nuevo?', 'No estoy seguro de lo quieres', 'búscalo en google a ver que tal'][random.randrange(3)]
    return response

print(get_response(sys.argv[1]))
# print('Hola, soy un bot de ayuda, ¿en que te puedo ayudar?')




