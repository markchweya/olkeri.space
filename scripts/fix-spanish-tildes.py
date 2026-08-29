# -*- coding: utf-8 -*-
"""Restore Spanish tildes that get dropped while authoring batches."""
import re, sys
FIX = {
 'ano':'año','anos':'años','pequeno':'pequeño','pequena':'pequeña','pequenos':'pequeños',
 'pequenas':'pequeñas','diseno':'diseño','disenar':'diseñar','disenado':'diseñado',
 'disenada':'diseñada','disenados':'diseñados','disenadas':'diseñadas','disena':'diseña',
 'disenan':'diseñan','disenaron':'diseñaron','disenador':'diseñador','disenadores':'diseñadores',
 'senal':'señal','senales':'señales','senalar':'señalar','senala':'señala','senale':'señale',
 'senalado':'señalado','ensenar':'enseñar','ensena':'enseña','ensenarle':'enseñarle',
 'companía':'compañía','companias':'compañías','compania':'compañía',
 'Espana':'España','espanol':'español','espanola':'española','espanoles':'españoles',
 'Bretana':'Bretaña','tamano':'tamaño','tamanos':'tamaños','danada':'dañada','danado':'dañado',
 'dano':'daño','danos':'daños','punado':'puñado','manana':'mañana','enganosa':'engañosa',
 'enganosas':'engañosas','enganoso':'engañoso','peldano':'peldaño','anade':'añade',
 'anadir':'añadir','anadido':'añadido','Anada':'Añada','sueno':'sueño','duenos':'dueños',
 'dueno':'dueño','extrano':'extraño','banos':'baños','montana':'montaña','campana':'campaña',
 'campanas':'campañas','acompana':'acompaña','acompanado':'acompañado',
}
PAT = re.compile(r'(?<![^\W\d_])(' + '|'.join(sorted(map(re.escape, FIX), key=len, reverse=True)) + r')(?![^\W\d_])')
for path in sys.argv[1:]:
    s = open(path, encoding='utf-8').read()
    out, n = PAT.subn(lambda m: FIX[m.group(0)], s)
    if n:
        open(path, 'w', encoding='utf-8').write(out)
    print(f"{path}: {n} fixed")
