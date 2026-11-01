# Cozinha planejada em L — pacote para revisão

**Estado: estudo técnico preliminar. NÃO liberar para corte ou furação.** Este pacote contém a simulação existente e uma relação das peças calculadas pelo modelo, para revisão humana e por outras ferramentas. Não é um projeto executivo final nem autorização para fabricação.

## Contexto
- Parede medida: 2.400 mm de largura × 2.450 mm de altura.
- Largura desejada dos móveis e do tampo principal: 2.300 mm; folga presumida de 100 mm à direita.
- Retorno à esquerda; fogão de piso encostado na extremidade; pia não integra o móvel; sem geladeira; micro-ondas sobre o tampo.
- Profundidade de bancada de 600 mm (escolha inicial usual), avanço adicional de 400 mm e distribuição dos módulos são hipóteses, não medições finais.
- Cliente prefere tampo de MDF/MDP ao de pedra e fará a montagem. O simulador representa um tampo de MDF de 25 mm como proposta preliminar.

## Arquivos
- `simulador/`: aplicativo estático Three.js; executar `python -m http.server 8000 -d simulador` e abrir http://localhost:8000.
- `projeto/revisao-tecnica.md`: geometria, hipóteses e bloqueios para fabricação.
- `projeto/pecas-modelo-preliminar.csv`: medidas derivadas do modelo atual, não prontas para corte. Unidades em milímetros; decimais usam ponto.
- `projeto/briefing-revisao-ia.md`: perguntas específicas para outra IA ou profissional.

## Atenção
- A folga e o movimento da dobradiça são aproximações; a simulação de colisões só verifica portas entre si no ângulo selecionado.
- O canto cego está sem acesso; falta solução para construção e fixação do retorno.
- Furos, fita de borda, cargas, fixações do pé, de módulos e da parede não estão definidos para fabricação.
- Não colocar tokens ou arquivos `.openai/hosting.json` em repositórios compartilhados. O material deste pacote não contém credenciais de hospedagem.
