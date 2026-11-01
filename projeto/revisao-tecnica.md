# Revisão técnica — 02

**PRELIMINAR · NÃO ENVIAR PARA CORTE OU FURAÇÃO**

## Medidas e hipóteses, em mm

| Item | Valor | Situação |
|---|---:|---|
| Parede principal | 2400 de largura × 2450 de altura | Informado pelo cliente |
| Extensão principal dos móveis | 2300 | Escolha do cliente, provisória |
| Folga à direita | 100 | Diferença matemática; distribuição precisa ser confirmada |
| Profundidade tampo | 600 | Valor usual escolhido para projeto; conferir instalação |
| Retorno | 400 além da profundidade de 600 | Hipótese acordada para simulação; confirmar na obra |
| Material do tampo | MDF/MDP revestido | Escolha informada; marca, espessura, bordas e junção a definir |
| Fogão | Convencional, encostado ao fim do retorno | Fora do escopo dos móveis |
| Pia | Fora do móvel planejado | Localização e interferências reais não medidas |
| Micro-ondas | Sobre o tampo | Modelo, largura, profundidade e ventilação não informados |

## Geometria atual do modelo (revisão 02), não final

Detalhes e motivos de cada mudança em `alteracoes-revisao-02.md`.

- Tampo principal 2300 × 600 e tampo do retorno 600 × 400, em MDF de 25 mm, **encostados nas paredes**; avançam 26 mm além das portas.
- Caixas com 550 de profundidade, 720 de altura, 120 acima do piso; fundo sobreposto de 6 mm; portas de 18 mm e 716 de altura.
- **Retorno:** uma única caixa de 1000 (da parede principal ao fim do L) com porta de 418 na parte livre; o canto é acessado por ela. Não há mais caixa de canto cego.
- **Trecho principal:** fechamento de 52 + três módulos de 558: 574 + 52 + 3 × 558 = 2300. Larguras inteiras calculadas pelo simulador; fechamento mínimo de 50.
- Portas do trecho principal com dobradiça à direita; porta do retorno com dobradiça na ponta do L. As quatro abrem a 90° sem sobreposição entre portas.
- Rodapé contínuo de 115, recuado 40: 1802 no trecho principal e 484 no retorno, ajustados na obra.
- Quatro caixas, quatro portas, quatro prateleiras e dezoito pés simbólicos. Altura final da bancada: 865 (ajustável até 895 nos pés).

## Ferragens indicadas, sujeitas a validação

- Dobradiça FGVTN MS Slow reta completa, 105°, código 51MS15XFG100B10: duas por porta, oito no modelo. Caneco Ø35 × 11,3 mm, mas posição e recobrimento dependem do calço e da tabela do fabricante. A trajetória exibida não foi calibrada com o mecanismo real.
- Pé Bigfer 02.03.384, 120–150 mm, rosca M10: quatro por caixa e seis na caixa longa do retorno (18 no modelo). A fixação, o inserto e a capacidade de carga não foram calculados.
- Suporte FGVTN 0091.801004, pino 5 mm: quatro por prateleira acessível, 16 no modelo; detalhamento de posição e profundidade ainda não feito.
- Puxador Renna Rigato Haste 3.650.8566, 128 mm entre furos: um por porta, quatro no modelo; verificar parafusos fornecidos e comprimento.
- MDF Guararapes RUC Branco TX de 18 mm para corpos e 6 mm para fundos são referências comerciais, não uma seleção definitiva de cor. Material resistente à umidade não é impermeável.
- Fixação de parede Fischer DuoPower 6 × 30 S, cantoneiras e parafusos estruturais são candidatos preliminares, NÃO uma ancoragem dimensionada.

## Necessário antes da produção

1. Levantar parede em três alturas, prumo, esquadro, piso, rodapé da casa e obstáculos; definir onde ficam os 100 mm de folga.
2. Conferir o retorno em planta e as condições do tampo e do micro-ondas; verificar a ventilação conforme o manual do aparelho. O fogão está fora do escopo dos móveis.
3. Validar a solução de canto da revisão 02 na obra: fixação do fechamento, sarrafo no retorno, encontro dos rodapés e sentido de abertura proposto. Conferir puxadores e fogão, que o simulador não verifica.
4. Calcular furação real conforme dobradiça, calço, parafusos, puxador, encaixe do pé e suportes escolhidos. Produzir vistas com origem, face de referência e profundidade de cada furo.
5. Definir tampo revestido de MDF/MDP: espessura, comprimento, emenda, fita, suportes e vedação; atualizar modelo e revisar capacidade dos pés e bases.
6. Definir ancoragem de acordo com a parede, tubulações e cargas. Fixar módulos entre si com solução adequada e revisar estabilidade.
7. Calcular as fitas de borda por aresta, folgas do material e espessura efetiva da fita; conferir espessura real da chapa e sentido do padrão.
8. Gerar plano de corte otimizado, desenhos cotados, lista de furação e montagem, conferir com a loja e obter revisão técnica antes de liberar o pedido.

Não existe aqui validação de choque com puxadores, ferragens, fogão, pia ou de todo o trajeto das portas. Não se deve interpretar a ausência de vermelho como liberação construtiva.
