import json
import random

def embaralhar_json(entrada, saida):
    # Abrir o arquivo de entrada
    with open(entrada, 'r', encoding='utf-8') as f:
        dados = json.load(f)  # Carrega o JSON como uma lista de objetos

    # Embaralhar a lista de objetos
    random.shuffle(dados)

    # Salvar no novo arquivo
    with open(saida, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=4)

    return dados

# Exemplo de uso
embaralhado = embaralhar_json('medios.json', 'medios_a.json')
print(embaralhado)
