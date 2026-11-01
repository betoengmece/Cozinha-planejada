# Revisão 02 — o que mudou e por quê

**PRELIMINAR · NÃO ENVIAR PARA CORTE OU FURAÇÃO.** Esta revisão corrige problemas de geometria da revisão 01. Ela não resolve furação, ancoragem, fita de borda nem o tampo definitivo (ver `revisao-tecnica.md`).

Unidades em mm. Valores para a parede de 2.400, móveis de 2.300, bancada de 600 e avanço do L de 400. O simulador recalcula tudo ao mudar essas medidas.

## 1. O tampo agora cobre as portas

**Problema na revisão 01:** caixa de 580 + fundo de 6 + porta de 18 = 604 mm, contra um tampo de 600 mm que começava na frente do fundo e não na parede. As portas ficavam no mesmo plano da borda do tampo e havia uma fresta de ~20 mm atrás dele.

**Correção:**

| Camada, da parede para a frente | mm |
|---|---:|
| Fundo sobreposto | 6 |
| Caixa (laterais, base, travessas) | **550** |
| Porta | 18 |
| Avanço do tampo além da porta | **26** |
| **Tampo, encostado na parede** | **600** |

A profundidade da caixa é calculada pelo simulador: `600 − 6 − 18 − 25 = 551`, arredondado para baixo em 10 mm → 550. Assim o tampo sempre avança de 25 a 35 mm além das portas, protegendo frentes e puxadores de respingos.

## 2. Sem caixa de canto cego

**Problema na revisão 01:** uma caixa de 600 × 580 no canto sem porta, prateleira ou acesso — volume pago e inutilizado — e uma caixa separada de 400 para o retorno.

**Correção:** a caixa do retorno passou a ir da parede principal até o fim do L (**1.000 mm** = 600 + 400). Os primeiros ~574 mm, junto ao canto, ficam atrás do fechamento; os 418 mm restantes recebem a porta. O canto é acessado por dentro, pela porta do retorno, e serve para itens de pouco uso (panelas grandes, estoque).

Ganhos: uma caixa a menos (2 laterais, base, 2 travessas e fundo a menos), nenhum volume fechado sem acesso e montagem mais simples.

Atenção: a prateleira do retorno tem 964 mm de vão em MDF de 18 mm. Use-a para cargas leves ou acrescente uma divisória central ao detalhar a furação.

## 3. Medidas inteiras e fechamento maior

**Problema na revisão 01:** três módulos de 556,667 mm (não cortáveis) e fechamento de canto de 30 mm, menor que a saliência do puxador (~25 mm) somada à folga de abertura.

**Correção:** o simulador agora calcula módulos com largura inteira em mm e joga a sobra no fechamento, que tem no mínimo 50 mm:

`574 (frente da porta do retorno) + 52 (fechamento) + 3 × 558 (módulos) = 2.300`

As portas do trecho principal passaram a ter **dobradiça à direita**, e a do retorno tem a dobradiça **na ponta do L**. Com isso, todas as quatro portas abrem a 90° ao mesmo tempo sem se tocar — conferido no simulador. Com dobradiça à esquerda, a porta do módulo 1 batia na do retorno.

## 4. Rodapé contínuo

**Problema na revisão 01:** um rodapé de 100 mm por módulo, com pés de 120 mm — fresta de 20 mm e várias emendas.

**Correção:** dois rodapés contínuos de **115 mm** (5 mm de folga para o piso), recuados 40 mm da frente das caixas: 1.802 mm no trecho principal e 484 mm no retorno. Devem ser cortados com sobra e ajustados na obra, presos aos pés frontais por clipes. Os pés passaram a ficar 80 mm atrás da frente da caixa para não encostar no rodapé.

## 5. Pés

A caixa longa do retorno recebe 6 pés (um par central). Total: 18 pés.

## Itens que continuam pendentes

- **Altura da bancada:** 120 (pé) + 720 (caixa) + 25 (tampo) = **865 mm**. O usual é ~900 mm e o ideal é igualar o tampo do fogão. O pé de 120–150 mm permite chegar a 895 mm — confira com o fogão real.
- **Fogão:** no 3D ele está de frente para fora do L, encostado na ponta do retorno. Confirme a posição real. Se a lateral do móvel ficar ao lado das bocas, deixe afastamento e proteção térmica (MDF e fita de PVC deformam com calor).
- **Tampo de MDF 25 mm:** confirmar se a loja tem RUC nessa espessura e no padrão; emenda em L com conector de tampo e vedação.
- Furação real das dobradiças, suportes de prateleira, união e pés; fita de borda por aresta; ancoragem; plano de corte otimizado.
