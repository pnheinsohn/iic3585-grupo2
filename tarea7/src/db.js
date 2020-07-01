export const items = [
    {
    "name": "IPhone11",
    "brand": "APPLE",
    "rating": 0,
    "specs": "64GB",
    "price": "$340.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/8107588_1?wid=800&hei=800&qlt=70",
    "id": 1
    },
    {
    "name": "LEDSAMSUNG",
    "brand": "SAMSUNG",
    "rating": 0,
    "specs": "55\" UHD 4K Smart TV",
    "price": "$153.899",
    "picture": "https://falabella.scene7.com/is/image/Falabella/6557607_1?wid=800&hei=800&qlt=70",
    "id": 2
    },
    {
    "name": "IPhoneSE",
    "brand": "APPLE",
    "rating": 0,
    "specs": "Black 128GB",
    "price": "$729.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/10698654_1?wid=800&hei=800&qlt=70",
    "id": 3
    },
    {
    "name": "SE_ELECTRONICS",
    "brand": "ProsumerGear",
    "rating": 0,
    "specs": "Metal",
    "price": "$80.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/7453580?wid=249&hei=249&qlt=70",
    "id": 4
    },
    {
    "name": "Teclado",
    "brand": "Macrotel",
    "rating": 0,
    "specs": "61-Teclas",
    "price": "$59.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/12579891?wid=249&hei=249&qlt=70",
    "id": 5
    },
    {
    "name": "Secadora",
    "brand": "MABE",
    "rating": 0,
    "specs": "9kg",
    "price": "$169.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/6343727?wid=249&hei=249&qlt=70",
    "id": 6
    },
    {
    "name": "NotebookAspire",
    "brand": "ACER",
    "rating": 0,
    "specs": "14\"",
    "price": "$449.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/10981049?wid=90&hei=90&qlt=70",
    "id": 7
    },
    {
    "name": "DuetMini2",
    "brand": "JBL",
    "rating": 0,
    "specs": "Inalámbricos",
    "price": "$29.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/11709363?wid=249&hei=249&qlt=70",
    "id": 8
    },
    {
    "name": "AudífonosT500",
    "brand": "JBL",
    "rating": 0,
    "specs": "Negros",
    "price": "$29.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/7319465?wid=249&hei=249&qlt=70",
    "id": 9
    },
    {
    "name": "TinyLove",
    "brand": "Colgate",
    "rating": 0,
    "specs": "Llavero",
    "price": "$8.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/10380353?wid=249&hei=249&qlt=70",
    "id": 10
    },
    {
    "name": "MouseGM055",
    "brand": "Urbano",
    "rating": 0,
    "specs": "Negro-Neon",
    "price": "$9.990",
    "picture": "https://falabella.scene7.com/is/image/Falabella/6995597?wid=249&hei=249&qlt=70",
    "id": 11
    }
];

const options = {
    keys: [
        "name",
        "brand",
    ]
}

export const fuse = new Fuse(items, options);
