Задача: рефакторинг

Цель рефакторинга: преобразовать код 
для облегчения последующей работы с ним. 

Преобразования будут выполняться
без внедрения новых парадигм разработки. 
(задача - отрефакторить, а не переделать)

Преобразованный код будет легче использовать при 
внедрения flux/redux/mobx или какой-либо другой 
библиотеки/концепции работы с данными.

В рамках ТЗ рефакторинг определяет концепцию преобразовании - 
направление, в котором необходимо двигаться дальше для того, 
чтобы получить качественный код.
Причины: большой объем работы.

========================== // ==============================

Дальнейший рефакторинг производить нецелесообразно. 
Без возможности исполнения этот код не работоспособен.

Следующие шаги:
- данные для таблицы получать не в компоненте таблицы, 
а в родителе.
- все запросы вынести в API, по аналогии.
- подключить  Redux.

========================== // ==============================

P.S.: этот код проще выбросить и написать всё с нуля.