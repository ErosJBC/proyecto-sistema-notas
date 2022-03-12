import requests as rq
import json
import random as rnd

especialidades = {
    'A1':'ARQUITECTURA',
    'C1':'INGENIERIA CIVIL',
    'E1':'INGENIERIA ECONOMICA',
    'E3':'INGENIERIA ESTADISTICA',
    'G1':'INGENIERIA GEOLOGICA',
    'G2':'INGENIERIA METALURGICA',
    'G3':'INGENIERIA DE MINAS',
    'I1':'INGENIERIA INDUSTRIAL',
    'I2':'INGENIERIA DE SISTEMAS',
    'L1':'INGENIERIA ELECTRICA',
    'L2':'INGENIERIA ELECTRONICA',
    'L3':'INGENIERIA DE TELECOMUNICACIONES',
    'M3':'INGENIERIA MECANICA',
    'M4':'INGENIERIA MECANICA Y ELECTRICA',
    'M5':'INGENIERIA NAVAL',
    'M6':'INGENIERIA MECATRONICA',
    'N1':'FISICA',
    'N2':'MATEMATICA',
    'N3':'QUIMICA',
    'N5':'INGENIERIA FISICA',
    'N6':'CIENCIA DE LA COMPUTACION',
    'P2':'INGENIERIA PETROQUIMICA',
    'P3':'INGENIERIA DE PETROLEO Y GAS NATURAL',
    'Q1':'INGENIERIA QUIMICA',
    'Q2':'INGENIERIA TEXTIL',
    'S1':'INGENIERIA SANITARIA',
    'S2':'INGENIERIA DE HIGIENE Y SEGURIDAD INDUSTRIAL',
    'S3':'INGENIERIA AMBIENTAL'
}

facultades = {
    'P': 'INGENIERIA DE PETROLEO, GAS NATURAL Y PETROQUIMICA',
    'I': 'INGENIERIA INDUSTRIAL Y DE SISTEMAS',
    'M': 'INGENIERIA MECÁNICA',
    'Q': 'INGENIERIA QUÍMICA Y TEXTIL',
    'A': 'ARQUITECTURA, URBANISMO Y ARTES',
    'C': 'INGENIERIA CIVIL',
    'N': 'CIENCIAS',
    'L': 'INGENIERIA ELECTRICA Y ELECTRONICA',
    'G': 'INGENIERIA GEOLOGICA, MINERA Y METALURGICA',
    'E': 'INGENIERIA ECONOMICA, ESTADISTICA Y CIENCIAS SOCIALES',
    'S': 'INGENIERIA AMBIENTAL',
}

def getStudents(url_id, url_photo):
    resp = rq.get(url_id)
    data = json.loads(resp.content)
    dictionaryStudents = []
    registro = {}
    with open('students-c.json', 'w') as file:
        for d in data:
            if (d.get('codigo')[0:4] >= '2010'):
                if (d.get('nombre') != '' and d.get('am') != '' and d.get('ap') != ''):
                    print(d.get('codigo'), d.get('am'), d.get('ap'), d.get('nombre'))
                    if int(d.get('codigo')[0:4]) >= 2020:
                        cycle = rnd.randint(1, 4)
                    elif int(d.get('codigo')[0:4]) <= 2019 and int(d.get("codigo")[:4]) >= 2018:
                        cycle = rnd.randint(3, 8)
                    elif int(d.get('codigo')[0:4]) <= 2017 and int(d.get("codigo")[:4]) >= 2016:
                        cycle = rnd.randint(6, 10)
                    elif int(d.get('codigo')[0:4]) <= 2015 and int(d.get("codigo")[:4]) >= 2014:
                        cycle = rnd.randint(9, 10)
                    else: cycle = "-"
                    if cycle == 1: cred = rnd.randint(0, 23)
                    elif cycle == 2: cred = rnd.randint(24, 44)
                    elif cycle == 3: cred = rnd.randint(45, 65)
                    elif cycle == 4: cred = rnd.randint(66, 87)
                    elif cycle == 5: cred = rnd.randint(88, 109)
                    elif cycle == 6: cred = rnd.randint(110, 132)
                    elif cycle == 7: cred = rnd.randint(133, 154)
                    elif cycle == 8: cred = rnd.randint(155, 176)
                    elif cycle == 9: cred = rnd.randint(177, 198)
                    elif cycle == 10: cred = rnd.randint(199, 217)
                    registro = {
                        "id_uni" : d.get('codigo'),
                        "surname" : d.get('ap'),
                        "second_surname": d.get('am'),
                        "names" : d.get('nombre'),
                        "faculty" : {
                            "id_faculty" : d.get('especialidad')[0],
                            "name_faculty" : facultades[d.get('especialidad')[0]]
                        },
                        "speciality" : {
                            "id_speciality" : d.get('especialidad'),
                            "name_speciality" : especialidades[d.get('especialidad')]
                        },
                        "cycle_relative" : cycle,
                        "approved_credits" : cred if cycle != "-" else 220,
                        "condition" : "ALUMNO REGULAR" if cycle != "-" else "EGRESADO",
                        "disciplinary_condition" : "NO TIENE",
                        "photo" : url_photo + d.get('codigo') + '.jpg'
                    }
                    dictionaryStudents.append(registro)
            else: break
        jsonDic = json.dumps(dictionaryStudents)
        file.write(jsonDic)
        file.close()