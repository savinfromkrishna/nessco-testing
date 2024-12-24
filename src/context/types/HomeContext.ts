type Item = {
    className: string;
    text: string;
  };
  
  type Product = {
    category: string;
    firstname: string;
    firstLink: string;
    secondname: string;
    secondLink: string;
    description: string;
    image: string;
    title: string;
    speed?: string;
    unit?: string;
    icon: string;
    items: Item[];
  };
  
  type StepperFilterItem = {
    name: string;
  };
  
 export  type ProductData = {
    title: any;
    category: string;
    products: Product[];
    stepperFilter: StepperFilterItem[];
  };
  
  export type PaperProductsCatalog = {
    category: string;
    data: ProductData;
  };