import { SearchBarFilterPropsTables } from "../types/Table";

import { Category } from "../types/Category";


export const currentOrdersData: Category = {
    storeInfo: {
        store: "100 Main St. Store",
        supplier: "Amazone",
        salse: "2500",
        budget: "2500",
        shipDate: "09/19/2023",
        purchaseDate: "09/15/2023",
    },
    currentOrders: [
        {
            id: 1,
            category: 'Food Category',
            products: [
                {
                    id: 1,
                    name: "Milk",
                    price: "5.00",
                    count: 2,
                },
                {
                    id: 2,
                    name: "Grains",
                    price: "10.00",
                    count: 4,
                },
                {
                    id: 3,
                    name: "Pastas",
                    price: "13.00",
                    count: 3,
                },
                {
                    id: 4,
                    name: "Almond Milk",
                    price: "10.00",
                    count: 2,
                },
                {
                    id: 5,
                    name: "Brown Bread",
                    price: "10.00",
                    count: 2,
                },
                {
                    id: 6,
                    name: "Cake",
                    price: "13.00",
                    count: 3,
                },
            ]
        },
        {
            id: 2,
            category: "Beverage Categories",
            products: [
                {
                    id: 7,
                    name: "Coconut Water",
                    price: "11.00",
                    count: 5,
                },
                {
                    id: 8,
                    name: "Fruit Juice Powder",
                    price: "15.00",
                    count: 1,
                },
                {
                    id: 9,
                    name: "Avocado Juice",
                    price: "7.00",
                    count: 12,
                },
            ]
        },
        {
            id: 3,
            category: "Tableware and Serving Supplies",
            products: [
                {
                    id: 10,
                    name: "Champagne Glass",
                    price: "11.00",
                    count: 6,
                },
                {
                    id: 11,
                    name: "Dinner Napkins",
                    price: "16.00",
                    count: 7,
                },
            ]
        }
    ],
    additionalItems: [
        {
            id: 4,
            category: 'Food Category',
            products: [
                {
                    id: 12,
                    name: "Brown Crab",
                    price: "11.00",
                    count: 0,
                },
                {
                    id: 13,
                    name: "American Lobster",
                    price: "15.00",
                    count: 0,
                },
                {
                    id: 14,
                    name: "Oyster",
                    price: "7.00",
                    count: 0,
                },
                {
                    id: 15,
                    name: "Sweet Corn",
                    price: "4.00",
                    count: 0,
                }
            ]
        },
        {
            id: 5,
            category: "Beverage Categories",
            products: [
                {
                    id: 16,
                    name: "Vodka",
                    price: "10.00",
                    count: 0,
                },
                {
                    id: 17,
                    name: "Gin",
                    price: "12.00",
                    count: 0,
                },
                {
                    id: 18,
                    name: "tequila",
                    price: "13.00",
                    count: 0,
                },
            ]
        },
        
    {
      id: 5,
      category: "Beverage Categories",
      products: [
        {
          id: 16,
          name: "Vodka",
          price: "10.00",
          count: 0,
        },
        {
          id: 17,
          name: "Gin",
          price: "12.00",
          count: 0,
        },
        {
          id: 18,
          name: "tequila",
          price: "13.00",
          count: 0,
        },
      ],
    },
    {
      id: 6,
      category: "Tableware and Serving Supplies",
      products: [
        {
          id: 19,
          name: "GOODHOMES Melamine Dinner Set",
          price: "10.00",
          count: 0,
        },
        {
          id: 20,
          name: "GOODHOMES Deep Plates",
          price: "12.00",
          count: 0,
        },
        {
          id: 21,
          name: "Dinner Plates (6 Pieces)",
          price: "13.00",
          count: 0,
        },
      ],
    },
    {
      id: 4,
      category: "Food Category",
      products: [
        {
          id: 12,
          name: "Brown Crab",
          price: "11.00",
          count: 0,
        },
        {
          id: 13,
          name: "American Lobster",
          price: "15.00",
          count: 0,
        },
        {
          id: 14,
          name: "Oyster",
          price: "7.00",
          count: 0,
        },
        {
          id: 15,
          name: "Sweet Corn",
          price: "4.00",
          count: 0,
        },
      ],
    },
    {
      id: 5,
      category: "Beverage Categories",
      products: [
        {
          id: 16,
          name: "Vodka",
          price: "10.00",
          count: 0,
        },
        {
          id: 17,
          name: "Gin",
          price: "12.00",
          count: 0,
        },
        {
          id: 18,
          name: "tequila",
          price: "13.00",
          count: 0,
        },
      ],
    },
    {
      id: 6,
      category: "Tableware and Serving Supplies",
      products: [
        {
          id: 19,
          name: "GOODHOMES Melamine Dinner Set",
          price: "10.00",
          count: 0,
        },
        {
          id: 20,
          name: "GOODHOMES Deep Plates",
          price: "12.00",
          count: 0,
        },
        {
          id: 21,
          name: "Dinner Plates (6 Pieces)",
          price: "13.00",
          count: 0,
        },
      ],
    },
  ],
};
export const freqSearchData: SearchBarFilterPropsTables[] = [
  {
    labelName: "Description",
    placeHolder: "Product",
    id: "productDescription",
    column: "productDescription",
  },
];
export const searchByCatData: SearchBarFilterPropsTables[] = [
  {
    labelName: "Category",
    placeHolder: "Search by Category",
    id: "Category",
    column: "Category",
  },
];

