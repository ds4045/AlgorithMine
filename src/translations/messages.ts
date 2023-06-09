interface Messages {
  [key: string]: {
    [key: string]: string;
  };
}

const messages: Messages = {
  en: {
    'not_found.text': 'Sorry, the page you visited does not exist.',
    'header.services': 'Services',
    'header.blog': 'Blog',
    'header.catalog': 'Catalog',
    'header.catalog_asic': 'Asic miners',
    'header.catalog_accessories': 'Accessories',
    'header.catalog_videocards': 'GPU',
    'header.aboutUs': 'About us',
    'header.login': 'Sign in',
    'carousel.title1': 'title1',
    'carousel.calculator': 'Profitability calculator',
    'carousel.quiz': 'Answer the questions and get a discount promo code',
    'carousel.delivery': 'Shipping from China at wholesale prices',
    'carousel.btn_calc': 'Сalculate',
    'carousel.btn_quiz': 'Go to questions',
    'popular.title': 'Popular manufacturer',
    'popular.all_btn': 'All Products',
    'auth.error': 'Authorization error, try again later',
    'auth.titleGoogle': 'Login with Google',
    'auth.titleRegGoogle': 'Register with Google',
    'auth.titleEmailPassword': 'Login with Login with email and password',
    'auth.titleCreate': 'Create account',
    'auth.btn_register': 'Register',
    'auth.btn_i_have_acc': 'I have account',
    'auth.btn_back': 'Back',
    'pc.btn_contacts': 'Contacts',
    'pc.btn_settings': 'Settings',
    'pc.btn_orders': 'My orders',
    'pc.btn_reviews': 'My reviews',
    'pc.btn_change': 'Change',
    'pc.inp_image': 'Avatar URL',
    'pc.inp_name': 'Your name',
    'pc.inp_surname': 'Your surname',
    'pc.inp_age': 'Your age',
    'pc.inp_city': 'Your city',
    'pc.inp_phone': 'Your phone number',
    'pc.alert_succ_change': 'Data changed successfully',
    'pc.alert_err_change': 'Error when changing data',
    'catalog.all': 'All',
    'catalog.comparison': 'Comparison',
    'catalog.favorites': 'Favorites',
    'catalog.cart': 'Cart',
    'catalog.parts': 'Parts',
    'catalog.accessory': 'Accessory',
    'catalog.sort.price_up': 'By price ▲',
    'catalog.sort.price_down': 'By price ▼',
    'catalog.sort.ths_up': 'By HR/s ▲',
    'catalog.sort.ths_down': 'By HR/s ▼',
    'catalog.sort': 'Sorting by:',
    'catalog.sort.rate': 'By rating',
    'catalog.card.btn_buy': 'Buy',
    'catalog.card.btn_more': 'More',
    'catalog.card.description': 'Description',
    'catalog.card.btn_from': 'from',
    'catalog.card.modal_expenditure': 'Expenditure',
    'catalog.card.modal_delivery_description':
      'Self-delivery:Moscow, Polykarpova street, 27c3,Delivery:SDEK,Business lines(from 300000rub free)',
    'catalog.card.modal_profit': 'Profit',
    'catalog.card.modal_payback': 'Payback',
    'catalog.card.modal_th': 'Hashrate',
    'catalog.card.modal_price': 'Price',
    'catalog.card.modal_maker': 'Manufacturer',
    'catalog.card.modal_inStock': 'In stock',
    'catalog.card.modal_sku': 'SKU',
    'catalog.card.modal_currency': 'Currency',
    'catalog.card.modal_remove_to_сomparison': 'Remove from list',
    'catalog.card.modal_delivery': 'Delivery',
    'catalog.card.modal_add_to_сomparison': 'Add to comparison',
    'catalog.card.modal_add_to_favorites': 'Add to favorites',
    'catalog.card.modal_delete_to_favorites': 'Remove from favorites',
    'catalog.card.modal_add_to_cart': 'Add to cart',
    'catalog.card.modal_reviews': 'Reviews',
    'catalog.card.modal_specifications': 'Specifications',
    'catalog.card.modal_add_reviews': 'Add review',
    'catalog.card.modal_review_date': 'Date',
    'catalog.card.modal_review_score': 'Score',
    'catalog.card.modal_under_the_order': 'Under the order',
    'catalog.reviews.check_login': 'Reviews can only be left by registered users',
    'catalog.favorites.check_login':
      'Add product to favorites can only be left by registered users',
    'catalog.added_favorites_success': 'Product added to favorites',
    'catalog.added_favorites_error': 'This product has already been added to favorites',
    'pc.alert_succ_add_review': 'Review successfully added',
    'pc.alert_err_add_review': 'Error when adding a review',
    'pc.company_address': 'Moscow, 27s3 Polikarpova Street',
    'catalog.reviews.anonim': 'Unknown',
    'catalog.reviews.check_added': 'Have you already left a review for this product',
    'catalog.reviews.submit': 'Submit',
    'catalog.reviews.check_added_empty_string': 'Your review cannot be empty',
    'catalog.comparison_more2': 'You can only compare 2 products',
    'catalog.comparison_add': 'Product added to comparison',
    'catalog.comparison_already_added': 'The product has already been added to the comparison',
    'cart.comparison_error_type': 'This product cannot be added to the comparison',
    'cart.empty': 'The basket is empty',
    'cart.btn_to_shop': 'Go to the catalog',
    'cart.cart': 'Cart',
    'cart.units': 'units',
    'cart.promo': 'Enter promo code',
    'cart.order_now': 'Order',
    'cart.address': 'Address',
    'cart.phone': 'Telephone',
    'cart.promo_success': 'Promo code applied successfully',
    'cart.promo_error': 'This promo code does not exist',
    'cart.contacts': 'Our contacts',
    'cart.add_item_alert': 'The product is added to the cart',
    'cart.total_price': 'Total:',
    'cart.order_success':
      'The order has been successfully placed, we will contact you shortly to clarify the details of the order',
    'cart.go_to_catalog': 'Continue shopping',
    'cart.order_success_thanks': 'Thanks for your order',
    'cart.order_confirm': 'Confirm the order for the total amount ',
    'cart.error_phone': 'The phone number must be correct',
    'cart.error_name': 'The name cannot be empty',
    'cart.error_email': 'The email must be correct',
    'cart.inp_name': 'Name',
    'cart.inp_phone': 'Phone',
    'cart.inp_email': 'Email',
    'cart.alert_success_order': 'The order has been successfully placed',
    'cart.alert_error_order': 'Fill in the data',
    'cart.empty_cart': 'Your shopping cart is empty',
    'pk.orders.product': 'Products',
    'pk.orders.amount': 'Amount ₽',
    'pk.orders.data': 'Data',
    'pk.orders.order_num': 'Order number',
    'pk.orders.units': 'Units',
    'pc.btn_our_contacts': 'Our contacts',
    'pc.contacts.address': 'Address',
    'pc.contacts.messengers': 'Messengers',
    'pc.contacts.email': 'Email',
    'quiz.prev': 'Previous',
    'quiz.next': 'Next',
    'quiz.done': 'Done',
    'quiz.promo': 'Your promo code',
    'quiz.question1': '1. What is your approximate budget?',
    'quiz.question2': '2. Have you ever been mining before?',
    'quiz.question3': '3. Do you need a site for the equipment?',
    'quiz.question4':
      'Done! We thank you for taking the survey and give you a promo code discount on our firmware when you buy any equipment! Our unique firmware increases the efficiency of miners up to 40-50%! Enter your phone number so we can contact you.',
    'quiz.question1.answer1': 'Up to 300 000 rubles.',
    'quiz.question1.answer2': 'From 300 000 rubles to 2 000 000 rubles.',
    'quiz.question1.answer3': 'From 2 000 000 rubles.',
    'quiz.question.your_choice': 'Your choice',
    'quiz.question2.answer1': 'Yes, there is experience',
    'quiz.question2.answer2': 'Yes, but not much experience.',
    'quiz.question2.answer3': "No, I didn't.",
    'quiz.question3.answer1': "You don't need a platform",
    'quiz.question3.answer2': 'Yes, we need a platform.',
    'posts.news': 'News',
    'posts.articles': 'Educational articles',
    'posts.popular': 'Popular ▼',
    'posts.date': 'New ▼',
    'posts.all': 'All articles',
    'posts.card_read': 'Read',
    'posts.check_login': 'Only registered users are allowed to rate',
    'app.get_lead': 'Still have questions? Leave a request and our specialists will call you back',
    'services.mining_hotel': 'Mining hotel',
    'services.mining_hotel.delivery': 'Shipping to the data center',
    'services.mining_hotel.placement': 'Equipment placement',
    'services.mining_hotel.security': 'Round-the-clock paramilitary guard',
    'services.mining_hotel.works': 'Ensuring uninterrupted operation',
    'services.mining_hotel.time':
      'Uptime of 99% ensures high reliability: this way your equipment will not be idle and will bring more profit.',
    'services.mining_hotel.energy':
      'Low cost of electricity It is fully legal electricity - 4.3 rubles per kWh with VAT.',
    'services.mining_hotel.security_icon':
      'Rosgvardia security The entire facility is guarded around the clock - all equipment is secure.',
    'services.mining_hotel.camera':
      'Placement monitoring In online format, you can monitor the effectiveness of your equipment from anywhere in the world.',
    'services.mining_pool': 'Mining pool',
    'services.mining_pool.easy': 'Easy connection',
    'services.mining_pool.commissions': 'Lowest commissions',
    'services.mining_pool.online': 'Online 24/7',
    'services.mining_pool.money':
      'One of the most profitable pools, thanks to the reward systems PPLNS and SOLO, as well as low commissions.',
    'services.mining_pool.team':
      'We are qualified pool support staff, miners, entrepreneurs, programmers.',
    'services.mining_pool.profit':
      'Highest performance with excellent connectivity.Our pool will increase your income!',
    'services.mining_pool.invest':
      'We support only short-term and long-term promising projects. With a good volume, a great team and the product as a whole.',
    'services.invest_mining': 'Investing in mining',
    'services.invest_mining.title': 'Investments in mining from 20% p.a.',
    'services.invest_mining.how': 'How will the process be structured?',
    'services.invest_mining.find':
      'Selection of equipment for your needs and budget.Depending on your goals and budget, our experts will prompt, what equipment is ideal for you.',
    'services.invest_mining.open':
      'We work openly and for the safety of our customers we have a contract.',
    'services.invest_mining.insurance':
      'All the equipment we bring is fully insured. Therefore, your funds will be safe.',
    'services.invest_mining.data_center':
      "The company's own data center allows you to place devices in a special-equipped room with round-the-clock security, cheap power and specialists who will monitor the devices around the clock.",
    'services.invest_mining.help':
      'Our specialists will connect your equipment to the mining pool, set up all the processes and do all the technical work.',
    'services.invest_mining.error':
      'In case of any malfunctions or questions during the operation of the equipment, our 24-hour technical support service will help you at any time.',
    'services.repair': 'Repair of equipment',
    'services.repair.why': 'WHY WE?',
    'services.repair.company': 'We are one of the largest companies in the country to repair asics',
    'services.repair.diagnostics':
      'Free diagnostics. Quick diagnostics from 20 min. After the diagnostics you will agree with the cost of repair of your asics',
    'services.repair.in_stock':
      'Parts are available! We use only original spare parts when repairing antminer S19 and other models.',
    'services.repair.insurance':
      'Guarantee up to 1 year. We provide a guarantee up to 1 year, we are fully responsible for the work. We are confident in the quality of the repairs we make.',
    'services.repair.repair':
      'We repair any model. We have 28 engineers on staff! Repairs from 30 minutes! We work as fast as possible.',
    'calculator.title': 'Calculate your profitability',
    'calculator.th': 'Total TH',
    'calculator.btc': 'BTC price in USD',
    'calculator.power': 'Power in W',
    'calculator.cost': 'Electricity costs USD/kWh',
    'calculator.pool': 'Pool fee in %',
    'calculator.calc': 'Calculate',
    'calculator.res': 'Profit for 30 days will be ~ ',
    'delivery.fast': 'Fastest equipment delivery in the IT market',
    'delivery.ship': 'Delivery all over the CIS',
    'delivery.payment': 'Payment and delivery',
    'delivery.payment.description':
      'In 7 years of operation, AlgorithMine has made more than 50,000 shipments in various ways.',
    'delivery.delivery.variants': 'WAYS OF DELIVERY',
    'delivery.delivery.variants_self': 'Self-delivery',
    'delivery.delivery.variants_self_description':
      'To get your order from Promminer yourself, you can choose the option of self-pickup. After the manager calls you and confirms the availability of the goods, you can come and pick up your order. The central office of Promminer is located in Moscow, Polykarpova street, 27 st3.',
    'delivery.delivery.variants_sdek': 'CDEK delivery',
    'delivery.delivery.variants_sdek_description':
      'CDEK Shipping CDEK shipping is a popular shipping option in Russia or the CIS. This method involves the use of a third-party transportation company for transportation. Delivery is made to the nearest delivery point in your city or to the address you specify. Delivery is free for orders over 300,000 rubles.',
    'delivery.delivery.variants_line': 'Delovye linii delivery',
    'delivery.delivery.variants_line_description':
      'Delivery is carried out by the shipping company "Business Line" to the selected delivery point in your city. With an order of 300 000 rubles and more delivery is free of charge.',
    'delivery.pay': 'Payment',
    'delivery.variants':
      'Payment for the selected equipment can be made in any way convenient for you.',
    'delivery.variants_description':
      "Credit card: you can pay for your order with a Visa or Mastercard credit card. Debit card: you can pay for your order with a debit card linked to your bank account. Bank transfer: you can pay for your order directly from your bank account to the company's account. At the office of the company: you can pay for your order at the central office of the company at the address: Moscow, Polykarpova street, 27, st3. After confirming your order on the website, our manager will contact you to clarify the details of delivery and placement of equipment.",
    'about_us.we':
      'We are a team of professionals engaged in the sale, installation, configuration and repair of mining equipment and accessories from world manufacturers, with an emphasis on environmental friendliness and energy efficiency.',
    'about_us.we2':
      'ALGORITHMINE was born out of a passion for innovative technology and a desire to provide our customers with the most advanced and environmentally friendly cryptocurrency mining solutions.',
    'about_us.history': "COMPANY'S HISTORY",
    'about_us.history_2017':
      'ALGORITHMINE was founded by a group of like-minded people with the goal of making the world of cryptocurrency accessible to everyone.',
    'about_us.history_2018':
      'The company is gaining credibility in the market thanks to its professional and customer-oriented activities.',
    'about_us.history_2019':
      'ALGORITHMINE establishes active cooperation with global manufacturers and becomes a leader in the mining equipment market.',
    'about_us.history_2020':
      "Eco-friendliness and energy savings are becoming key priorities in the company's equipment and solutions offerings.",
    'about_us.history_2021':
      'ALGORITHMINE strengthens its market position by increasing the network of partners and expanding the range of equipment.',
    'about_us.history_2022':
      'The company implements innovative technologies to improve service and offer cutting-edge solutions.',
    'about_us.history_2023':
      'ALGORITHMINE continues to expand into the global marketplace, maintaining a focus on sustainability and energy conservation.',
    'about_us.p1':
      'We believe in the power of cryptocurrency as an important element of the modern world, and we strive to facilitate access to this world for each of you, while preserving our planet for future generations.',
    'about_us.p2':
      'We are well aware of the power consumption issues in the mining industry, and we are actively working to offer our customers energy-efficient equipment that will reduce their environmental footprint.',
    'about_us.p3':
      'Eco-friendliness and energy savings are our key priorities. When you work with ALGORITHMINE you can count on the following:',
    'about_us.li1':
      "A wide range of energy-efficient equipment from the world's leading manufacturers",
    'about_us.li2':
      'Professional installation, setup and repair of your mining equipment in accordance with environmental standards',
    'about_us.li3':
      'Constant updating of our range, thanks to close cooperation with manufacturers who care about the environment',
    'about_us.li4':
      'Individual approach to each client, assistance in choosing the best and environmentally friendly equipment for your purposes',
    'about_us.li5': 'Prompt and high-quality technical support',
    'about_us.li6':
      'A flexible system of discounts and loyalty for our regular customers, additional bonuses and benefits for those who focus on environmental friendliness and energy saving',
    'about_us.p4':
      'We are grateful to you for your interest in our company and pleased to be your guide to the world of green cryptocurrency mining.',
    'about_us.p5':
      'Together with ALGORITHMINE you will take the first steps to success in this promising and exciting industry, contribute to the preservation of natural resources and build a beautiful future for all mankind.',
    'about_us.p6':
      "Join us, and let's grow and develop together, taking care of the well-being of our planet!",
    'about_us.p7':
      'With respect and faith in our successful and environmentally responsible cooperation, ALGORITHMINE Team!',
  },

  ru: {
    'not_found.text': 'Извините, страница, которую вы посетили, не существует.',
    'header.services': 'Услуги',
    'header.catalog': 'Каталог',
    'header.blog': 'Блог',
    'header.catalog_asic': 'Asic майнеры',
    'header.catalog_accessories': 'Комплектующие',
    'header.catalog_videocards': 'Видео карты',
    'header.login': 'Войти',
    'header.aboutUs': 'О нас',
    'carousel.title1': 'Заголовок1',
    'carousel.calculator': 'Калькулятор доходности',
    'carousel.quiz': 'Oтветь на вопросы и получи промокод нa скидку',
    'carousel.delivery': 'Доставка из Китая по оптовым ценам',
    'carousel.btn_calc': 'Рассчитать',
    'carousel.btn_quiz': 'Перейти к вопросам',
    'popular.title': 'Популярные производители',
    'popular.all_btn': 'Все товары',
    'auth.error': 'Ошибка,попробуйте позже',
    'auth.titleGoogle': 'Войти с помощью Google',
    'auth.titleRegGoogle': 'Регистрация с Google',
    'auth.titleEmailPassword': 'Войти с помощью почты и пароля',
    'auth.titleCreate': 'Создать аккаунт',
    'auth.btn_back': 'Назад',
    'auth.btn_register': 'Регистрация',
    'auth.btn_i_have_acc': 'У меня уже есть аккаунт',
    'pc.btn_settings': 'Настройки',
    'pc.btn_contacts': 'Контакты',
    'pc.btn_orders': 'Мои заказы',
    'pc.btn_reviews': 'Мои отзывы',
    'pc.btn_change': 'Изменить',
    'pc.inp_image': 'Ссылка на аватар',
    'pc.inp_name': 'Ваше имя',
    'pc.inp_surname': 'Ваша фамилия',
    'pc.inp_age': 'Ваш возраст',
    'pc.inp_city': 'Ваш город',
    'pc.inp_phone': 'Ваш номер телефона',
    'pc.alert_succ_change': 'Данные успешно изменены',
    'pc.alert_err_change': 'Ошибка при изменении данных',
    'catalog.all': 'Все',
    'catalog.card.modal_currency': 'Валюта',
    'catalog.comparison': 'Сравнить',
    'catalog.favorites': 'Избранное',
    'catalog.cart': 'Корзина',
    'catalog.parts': 'Запчасти',
    'catalog.accessory': 'Аксессуары',
    'catalog.sort.price_up': 'По цене ▲',
    'catalog.sort.price_down': 'По цене ▼',
    'catalog.sort.ths_up': 'По HR/s ▲',
    'catalog.sort.ths_down': 'По HR/s ▼',
    'catalog.sort': 'Сортировать по:',
    'catalog.sort.rate': 'По рейтингу',
    'catalog.card.btn_buy': 'Купить',
    'catalog.card.btn_more': 'Подробнее',
    'catalog.card.description': 'Описание',
    'catalog.card.btn_from': 'от',
    'catalog.card.modal_expenditure': 'Потребление',
    'catalog.card.modal_profit': 'Доходность',
    'catalog.card.modal_payback': 'Окупаемость',
    'catalog.card.modal_hashrate': 'Хешрейт',
    'catalog.card.modal_price': 'Цена',
    'catalog.card.modal_inStock': 'В наличии',
    'catalog.card.modal_sku': 'Артикул',
    'catalog.card.modal_delivery': 'Доставка',
    'catalog.card.modal_maker': 'Производитель',
    'catalog.card.modal_add_to_сomparison': 'Добавить к сравнению',
    'catalog.card.modal_remove_to_сomparison': 'Убрать из списка',
    'catalog.card.modal_add_to_favorites': 'Добавить в избранное',
    'catalog.card.modal_delete_to_favorites': 'Убрать из избранного',
    'catalog.card.modal_add_to_cart': 'Добавить в корзину',
    'catalog.card.modal_reviews': 'Отзывы',
    'catalog.card.modal_specifications': 'Характеристики',
    'catalog.card.modal_add_reviews': 'Написать отзыв',
    'catalog.card.modal_review_date': 'Дата',
    'catalog.card.modal_review_score': 'Оценка',
    'catalog.card.modal_under_the_order': 'Под заказ',
    'catalog.reviews.check_login': 'Отзывы могут оставлять только зарегистрированные пользователи',
    'catalog.favorites.check_login':
      'Добавлять в избранное могут только зарегистрированные пользователи',
    'pc.alert_succ_add_review': 'Отзыв успешно добавлен',
    'pc.alert_err_add_review': 'Ошибка при добавлении отзыва',
    'pc.company_address': 'Москва, улица Поликарпова, 27с3',
    'catalog.reviews.anonim': 'Аноним',
    'catalog.reviews.check_added': 'Вы уже оставляли отзыв на этот товар',
    'catalog.reviews.submit': 'Отправить',
    'catalog.reviews.check_added_empty_string': 'Ваш отзыв не может быть пустым',
    'catalog.added_favorites_success': 'Товар добавлен в избранное',
    'catalog.added_favorites_error': 'Этот товар уже добавлен в избранное',
    'catalog.comparison_more2': 'Сравнивать можно только 2 товара',
    'catalog.comparison_already_added': 'Товар уже добавлен к сравнению',
    'catalog.comparison_add': 'Товар добавлен к сравнению',
    'cart.comparison_error_type': 'Данный товар нельзя добавить к сравнению',
    'cart.empty': 'Корзина пуста',
    'cart.btn_to_shop': 'Перейти в каталог',
    'cart.cart': 'Корзина',
    'cart.units': 'ед.',
    'cart.promo': 'Ввести промокод',
    'cart.order_now': 'Заказать',
    'cart.address': 'Адрес',
    'cart.phone': 'Телефон',
    'cart.promo_success': 'Промкод успешно приминен',
    'cart.promo_error': 'Такого промокода не существует',
    'cart.contacts': 'Наши контакты',
    'catalog.card.modal_delivery_description':
      'Самовывоз:Москва, улица Поликарпова, 27с3,Доставка:СДЕК,Деловые линии(от 300000руб бесплатно)',
    'cart.add_item_alert': 'Товар добавлен к корзину',
    'cart.total_price': 'Итог:',
    'cart.order_success':
      'Заказ успешно оформлен,мы свяжемся с вами в ближайшее время для уточнения деталей заказа',
    'cart.go_to_catalog': 'Продолжить покупки',
    'cart.order_success_thanks': 'Спасибо за заказ',
    'cart.order_confirm': 'Подвердите заказ на общую сумму ',
    'cart.error_phone': 'Номер телефона должен быть корректным',
    'cart.error_name': 'Имя не может быть пустым',
    'cart.error_email': 'Почта должна быть корректной',
    'cart.inp_email': 'Почта',
    'cart.inp_name': 'Имя',
    'cart.inp_phone': 'Телефон',
    'cart.alert_success_order': 'Заказ успешно оформлен',
    'cart.alert_error_order': 'Заполните данные',
    'cart.empty_cart': 'Ваша корзина пуста',
    'pk.orders.product': 'Товары',
    'pk.orders.amount': 'Всего ₽',
    'pk.orders.data': 'Дата',
    'pk.orders.order_num': 'Номер заказа',
    'pk.orders.units': 'Кол-во',
    'pc.btn_our_contacts': 'Наши контакты',
    'pc.contacts.address': 'Адресс',
    'pc.contacts.messengers': 'Мессенджеры',
    'pc.contacts.email': 'Почта',
    'quiz.prev': 'Предыдущий',
    'quiz.next': 'Следующий',
    'quiz.done': 'Завершить',
    'quiz.promo': 'Ваш промокод',
    'quiz.question1': '1. Какой у вас ориентировочный бюджет?',
    'quiz.question2': '2. Занимались ли вы майнингом раньше?',
    'quiz.question3': '3. Нужна ли вам площадка для оборудования?',
    'quiz.question4':
      'Готово! Мы благодарим вас за прохождение опроса и дарим вам промокод на скидку на наши прошивки при покупке любого оборудования! Наши уникальные прошивки увеличивают эффективность майнеров до 40-50%! Введите номер телефона, чтобы мы могли связаться с вами.',
    'quiz.question.your_choice': 'Свой вариант',
    'quiz.question1.answer1': 'От 300 000 руб.',
    'quiz.question1.answer2': 'От 300 000 руб. до 2 000 000 руб.',
    'quiz.question1.answer3': 'От 2 000 000 руб.',
    'quiz.question2.answer1': 'Да, есть опыт',
    'quiz.question2.answer2': 'Да, но опыт небольшой',
    'quiz.question2.answer3': 'Нет, не занимался',
    'quiz.question3.answer1': 'Площадка не нужна',
    'quiz.question3.answer2': 'Да,площадка нужна',
    'posts.news': 'Новости',
    'posts.articles': 'Образовательные статьи',
    'posts.popular': 'Популярные ▼',
    'posts.date': 'Новые ▼',
    'posts.all': 'Все статьи',
    'posts.card_read': 'Читать',
    'posts.check_login': 'Ставить оценку могут только зарегестрированные пользователи',
    'app.get_lead': 'Остались вопросы?Оставтье заявку и наши специалисты вам перезвонят',
    'services.mining_hotel': 'Майнинг отель',
    'services.mining_hotel.delivery': 'Доставка в дата-центр',
    'services.mining_hotel.placement': 'Размещение оборудования',
    'services.mining_hotel.security': 'Круглосуточная военизированная охрана',
    'services.mining_hotel.works': 'Обеспечение бесперебойной работы',
    'services.mining_hotel.time':
      'Uptime 99% обеспечивает высокую надежность: таким образом ваше оборудование не будет простаивать и будет приносить больше прибыли.',
    'services.mining_hotel.energy':
      'Низкая стоимость электроэнергии Это полностью легальная электроэнергия — 4,3 рубля кВТ/час с НДС.',
    'services.mining_hotel.security_icon':
      'Охрана Росгвардии Весь объект в круглосуточном режиме находится под охраной — все оборудование надежно защищено.',
    'services.mining_hotel.camera':
      'Мониторинг размещения В онлайн формате сможете отслеживать эффективность вашего оборудования из любой точки мира.',
    'services.mining_pool': 'Майнинг пул',
    'services.mining_pool.easy': 'Простое подключение',
    'services.mining_pool.commissions': 'Самые низкие комиссии',
    'services.mining_pool.online': 'Онлайн 24/7',
    'services.mining_pool.money':
      'Один из самых прибыльных пулов, благодаря системам вознаграждения PPLNS и SOLO, а так же низким комиссиям.',
    'services.mining_pool.team':
      'Мы квалифицированные сотрудники поддержки пула, майнеры, предприниматели, программисты.',
    'services.mining_pool.profit':
      'Высочайшая производительность с отличной связью.Наш пул увеличит ваши доходы!',
    'services.mining_pool.invest':
      'Мы поддерживаем только краткосрочные и долгосрочные перспективные проекты. С хорошим объемом, отличной командой и продуктом в целом.',
    'services.invest_mining': 'Инвестиции в майнинг',
    'services.invest_mining.title': 'Инвестиции в майнинг от 20% годовых',
    'services.invest_mining.how': 'Как будет построен процесс?',
    'services.invest_mining.find':
      'Подбор оборудования под ваши потребности и бюджет.В зависимости от ваших целей и бюджета наши специалисты подскажут, какое оборудование идеально подойдет именно вам.',
    'services.invest_mining.open':
      'Мы работаем открыто и в целях безопасности наших клиентов заключаем договор.',
    'services.invest_mining.insurance':
      'Всё оборудование, которые мы привозим — полностью застраховано. Поэтому ваши средства будут в безопасности.',
    'services.invest_mining.data_center':
      'Собственный дата-центр компании позволяет разместить устройства в специально-оборудованном помещении с круглосуточной охраной, дешёвой электроэнергией и специалистами, которые в круглосуточном режиме будут следить за работой аппаратов.',
    'services.invest_mining.help':
      'Наши специалисты сами подключат ваше оборудование к майнинг-пулу, настроят все процессы и сделают всю техническую работу.',
    'services.invest_mining.error':
      'В случае каких-то неисправностей или возникших вопросов в процессе эксплуатации оборудования наша круглосуточная служба технической поддержки в любое время окажет вам помощь.',
    'services.repair': 'Ремонт оборудования',
    'services.repair.why': 'ПОЧЕМУ МЫ?',
    'services.repair.company': 'Мы одна из самых крупных компаний в стране по ремонту асиков',
    'services.repair.diagnostics':
      'Бесплатная диагностика. Быстрая диагностика от 20 мин. После диагностики с Вами согласовывают стоимость ремонта Ваших асиков',
    'services.repair.in_stock':
      'Запчасти в наличии! При ремонте antminer S19 и других моделей, мы используем только оригинальные запчасти.',
    'services.repair.insurance':
      'Гарантия до 1-го года. Предоставляем гарантию до 1 года, несем полную ответственность за работу. Мы уверены в качестве ремонта, который производим.',
    'services.repair.repair':
      'Ремонтируем любую модель. У нас в штате 28 инженеров! Ремонт от 30 минут! Мы работаем максимально оперативно.',
    'calculator.title': 'Рассчитайте свою доходность',
    'calculator.th': 'Всего TH',
    'calculator.btc': 'Цена BTC в USD',
    'calculator.power': 'Мощность в W',
    'calculator.cost': 'Затраты на электроэнергию USD/kWh',
    'calculator.pool': 'Плата за пул в %',
    'calculator.calc': 'Рассчитать',
    'calculator.res': 'Прибыль за 30 дней составит ~ ',
    'delivery.fast': 'Самая быстрая доставка оборудования на IT рынке',
    'delivery.ship': 'Доставка по всему СНГ',
    'delivery.payment': 'Оплата и доставка',
    'delivery.payment.description':
      'За 7 лет работы, компания AlgorithMine осуществила более 50 000 отгрузок различными способами.',
    'delivery.delivery.variants': 'СПОСОБЫ ДОСТАВКИ',
    'delivery.delivery.variants_self': 'Самовывоз',
    'delivery.delivery.variants_self_description':
      'Самовывоз Чтобы получить заказ от Promminer самостоятельно, вы можете выбрать вариант самовывоза. После того, как вам позвонит менеджер и подтвердит наличие товара, можете приехать и забрать свой заказ. Центральный офис компании Promminer находится в Москве, по адресу: ул. Поликарпова, 27 ст3',
    'delivery.delivery.variants_sdek': 'Доставка CDEK',
    'delivery.delivery.variants_sdek_description':
      'Доставка CDEK Доставка товара транспортной компанией – популярный вариант доставки по РФ или СНГ. Этот способ предполагает использование сторонней транспортной компании для перевозки. Доставка осуществляется до ближайшего к вам пункта выдачи в вашем городе или на указанный вами адрес. При заказе от 300 000 руб доставка бесплатная.',
    'delivery.delivery.variants_line': 'Доставка “Деловые линии"',
    'delivery.delivery.variants_line_description':
      'Доставка осуществляется транспортной компанией “Деловые линии” до выбранного пункта выдачи в вашем городе. При заказе от 300 000 руб доставка бесплатная.',
    'delivery.pay': 'Оплата',
    'delivery.variants':
      'Оплата выбранного вами оборудования может быть осуществлена любым удобным для вас способом',
    'delivery.variants_description':
      'Кредитная карта: вы можете оплатить свой заказ с помощью кредитной карты Visa или Mastercard. Дебетовая карта: вы можете оплатить свой заказ с помощью дебетовой карты, привязанной к вашему банковскому счету. Банковский перевод: вы можете оплатить свой заказ напрямую со своего банковского счета на счет компании. В офисе компании: вы можете оплатить свой заказа в центральном офисе компании по адресу: г. Москва, ул. Поликарпова, 27 ст3. После подтверждения заказа на сайте с вами свяжется менеджер нашей компании для уточнения деталей доставки и размещения оборудования.',
    'about_us.we':
      'Мы - команда профессионалов, занимающаяся продажей, установкой, настройкой и ремонтом майнинг оборудования и комплектующих от мировых производителей, с акцентом наэкологичность и энергосбережение.',
    'about_us.we2':
      'ALGORITHMINE возникла из страсти к инновационным технологиям и стремлению предоставить нашим клиентам самые передовые и экологически дружественные решения в области криптовалютного майнинга.',
    'about_us.history': 'ИСТОРИЯ КОМПАНИИ',
    'about_us.history_2017':
      'ALGORITHMINE основана группой единомышленников с целью сделать мир криптовалют доступным для всех.',
    'about_us.history_2018':
      'Компания завоевывает доверие на рынке благодаря профессиональной и клиентоориентированной деятельности.',
    'about_us.history_2019':
      'ALGORITHMINE устанавливает активное сотрудничество с мировыми производителями и становится лидером на рынке майнинг оборудования.',
    'about_us.history_2020':
      'Экологичность и энергосбережение становятся ключевыми приоритетами компании в предложении оборудования и решений.',
    'about_us.history_2021':
      'ALGORITHMINE укрепляет свои позиции на рынке, наращивая сеть партнеров и расширяя ассортимент оборудования.',
    'about_us.history_2022':
      'Компания внедряет инновационные технологии для улучшения качества обслуживания и предложения передовых решений.',
    'about_us.history_2023':
      'ALGORITHMINE продолжает экспансию на мировой рынок, сохраняя акцент на экологичности и энергосбережении.',
    'about_us.p1':
      'Мы верим в мощь криптовалюты как важного элемента современного мира и стремимся облегчить доступ к этому миру для каждого из Вас, сохраняя при этом нашу планету для будущих поколений.',
    'about_us.p2':
      'Мы прекрасно понимаем проблемы, связанные с энергопотреблением в индустрии майнинга, и активно работаем над тем, чтобы предложить нашим клиентам энергоэффективное оборудование, что позволит снизить воздействие на окружающую среду.',
    'about_us.p3':
      'Экологичность и энергосбережение – вот наши ключевые приоритеты. Сотрудничая с ALGORITHMINE, Вы можете рассчитывать на следующее:',
    'about_us.li1':
      'Широкий ассортимент энергоэффективного оборудования от ведущих мировых производителей',
    'about_us.li2':
      'Профессиональная установка, настройка и ремонт вашего майнинг оборудования с учетом экологических стандартов',
    'about_us.li3':
      'Постоянное обновление нашего ассортимента, благодаря тесному сотрудничеству с производителями, заботящимися об окружающей среде',
    'about_us.li4':
      'Индивидуальный подход к каждому клиенту, помощь в выборе оптимального и экологичного оборудования для Ваших целей',
    'about_us.li5': 'Оперативная и качественная техническая поддержка',
    'about_us.li6':
      'Гибкая система скидок и лояльности для наших постоянных клиентов, дополнительные бонусы и преимущества для тех, кто делает акцент на экологичности и энергосбережении',
    'about_us.p4':
      'Мы благодарны Вам за проявленный интерес к нашей компании и рады быть Вашим проводником в мир экологичного криптовалютного майнинга.',
    'about_us.p5':
      'Вместе с ALGORITHMINE Вы сделаете первые шаги к успеху в этой перспективной и захватывающей отрасли, внесете свой вклад в сохранение природных ресурсов и строительства прекрасного будущего для всего человечества.',
    'about_us.p6':
      'Присоединяйтесь к нам, и будем расти и развиваться вместе, заботясь о благополучии нашей планеты!',
    'about_us.p7':
      'С уважением и верой в наше успешное и экологически ответственное сотрудничество, Команда ALGORITHMINE!',
  },
};

export default messages;
