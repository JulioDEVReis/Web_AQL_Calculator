# Calculadora WEB para Inspeções AQL e Farmacoteca
Calculadora baseada nas Boas Práticas de Fabrico, para inspeções AQL e Farmacoteca.
As tabelas de inspeções utilizadas são as indicadas para inspeções AQL, considerando a tolerância utilizadas pela empresa que utiliza esse App. Para uso por outras empresas, há necessidade de adequar as tabelas de inspeções para as tolerâncias utilizadas, conforme procedimentos e orientações gerenciais.

Trata-se de uma calculadora eficaz para inspetores que desejam realizar suas inspeções AQL de forma prática e rápida, com o auxílio de um telemóvel com acesso a internet. Nessa calculadora o inspetor poderá escolher entre a inspeção de produtos semi-acabados ou de produtos acabados, e o tipo de recipiente é utilizado na produção, nesse caso sendo plástico ou vidro, ampolas ou frascos.
De acordo com sua escolha, abre as opções e inputs necessários para a realização dos cálculos da sua inspeção.

Tudo é armazenado em um Dashboard para acompanhamento durante as inspeções, cabendo ao inspetor finalizar a inspeção para que a mesma saia do dashboard.

## Dashboard
O Dashboard é o local onde o inspetor pode visualizar todas as inspeções em andamento, salvas por ele.
O Dashboard é guardado em um arquivo JSON, que é armazenado no servidor do aplicativo, e é atualizado a cada vez que a pagina é atualizada ou aberta. As inspeções são apagadas apenas quando o inspetor carrega no botão para fechar a inspeção.
![captura de tela com a apresentação do Dashboard, que inclui todas as inspeções salvas](</Assets/capturasEcra/Captura de ecrã 2025-02-17, às 07.55.46.png>)

## Produtos Semi-Acabados
Apenas abre a escolha do tipo de recipiente (embalagem primária): Ampolas ou Frascos
![captura de tela com seleção dos produtos semi acabados](</Assets/capturasEcra/Captura de ecrã 2025-02-17, às 07.46.57.png>)

Basta indicar a quantidade do lote e o tipo de inspeção e teremos o calculo da inspeção AQL, baseado na Amostragem Normal Nivel II
![captura de tela com dados a serem preenchidos pelo inspetor para os calculos AQL de produto semi acabado](</Assets/capturasEcra/Captura de ecrã 2025-02-17, às 07.49.32.png>)

## Produtos Acabados
Nesse caso abre a oportunidade de escolheremos entre ampolas de plastico ou vidro e frascos de plástico ou vidro. Essa escolha determina as próximas opções, uma vez que, como produto acabado recolhe-se amostras para farmacoteca, utilizamos dos padrões de embalamento para indicar as caixas secundárias a qual precisamos retirar para farmacoteca, e também em quais caixas coletivas iremos realizar as inspeções e retiradas de amostras.
Nesse caso a quantidade de inspeções é baseada nas tabelas Normal Nivel II, Apertada Nivel II ou Especial S-4.
![captura de tela com seleção de produtos acabados](</Assets/capturasEcra/Captura de ecrã 2025-02-17, às 07.52.09.png>)

![captura de tela com dados a serem preenchidos pelo inspetor para os calculos AQL e farmacoteca de produto acabado, nesse caso, ampolas de vidro](</Assets/capturasEcra/Captura de ecrã 2025-02-17, às 07.53.17.png>)