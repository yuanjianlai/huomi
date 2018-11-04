from django.core.serializers import serialize, deserialize
import json


def SerializeModelsToJsonMap(**kmodels):
    map = {}
    for key, models in kmodels.items():
        map[key] = serialize('json', models)
    return map


def DeserializeModelsFromRequest(request):
    map = {}
    data = json.loads(request.body)
    for key in data.keys():
        model_generator = deserialize('json', json.dumps(data.get(key, None)))
        models = []
        if not model_generator:
            continue
        for model in model_generator:
            models.append(model)
        map[key] = models
    return map
