import { Page4Data } from "../ProcessFlow";
  export type lottieAnimations={
    speed?:object,
    size?:object,
    range?:object
  }
  export type Machine = {
    lottieAnimations?: lottieAnimations;
    descriptionSize: string;
    descriptionRange: string;
    descriptionSpeed: string;
    descriptionHeading: string;
    descriptionSubHeading: string;
    product_description: string;
    technicalSpecifications: {
      specifications: Specification[];
    };
  };
  interface Specification {
    title: string;
  }
  export type IndividualProductsData = {
    name: string;
    image: string;
    application: string;
    mimage: string;
    product_heading: string;
    first_name: string;
    second_name: string;
    advantages: { title: string; items: { title: string; }[]; };
    introduction: string;
    product_description: string;
    link: string;
    applicationData: ApplicationDataType[];
    TechnicalSpecificationComponentData: TechnicalSpecificationComponentDataType;
    related_product: RelatedProductType;
    IndividualProducts: any;
    category: string;
    data: {
      Machines: MachineType[];
    };
  };
  
 export type MachineType = {
    drawingImage:string;
    Page4Data: Page4Data;
    link: string;
    name: string;
    image: string;
    mimage: string;
    specification_image: ImageObject[];
    applicationData: ApplicationDataType[];
    product_heading: string;
    first_name: string;
    second_name: string;
    category: string;
    icon: string;
    introduction: string;
    parameters: string;
    application: string;
    descriptionHeading: string;
    descriptionSubHeading: string;
    descriptionSpeed: string;
    descriptionRange: string;
    descriptionSize: string;
    product_description: string;
    status: string;
    cupFormationData: CupFormationDataType;
    rating: RatingType;
    technicalSpecifications: TechnicalSpecificationsType;
    TechnicalSpecificationComponentData: TechnicalSpecificationComponentDataType;
    advantages: AdvantagesType;
    paperTypes: PaperTypesType;
    optional_add_ons: string;
    FAQ: FAQType;
    related_product: RelatedProductType;
  };
  
  type ImageObject = {
    [key: string]: string;
  };
  
 export type ApplicationDataType = {
    category: string;
    title: string;
    src: string;
  };
  
  type CupFormationDataType = {
    heading: string;
    subheading: string;
    image: {
      src: string;
      alt: string;
    };
  };
  
  type RatingType = {
    stars: string;
    reviews: string;
  };
  
  export type TechnicalSpecificationsType = {
    title: string;
    specifications: {
      title: string;
    }[];
  };
  
  export type TechnicalSpecificationComponentDataType = {
    src: string ;
    title: string;
    image: {
      src: string;
      alt: string;
    };
    tableHeadLeft: string;
    tableHeadRight: string;
    TableData: TableDataType[];
  };
  
  type TableDataType = {
    feature: string;
    spec: string;
  };
  
  type AdvantagesType = {
    title: string;
    items: {
      title: string;
    }[];
  };
  
  type PaperTypesType = {
    title: string;
    types: {
      type: string;
      image: string;
    }[];
  };
  
  export type FAQType = {
    title: string;
    subTitle: string;
    questions: {
      que: string;
      ans: string;
    }[];
  };
  
  export type RelatedProductType = {
    title: string;
    imageWithDescription: ImageWithDescriptionType[];
  };
  
  type ImageWithDescriptionType = {
    h1: string;
    h2: string;
    h3: string;
    s: string;
    sInformation: string;
    img: string;
    image: string;
    imageInformation: string;
    information: string;
  };
  