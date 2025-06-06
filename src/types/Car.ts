export interface Car {
  code: string;
  name_details: string;
  picture_url: PictureURL;
  features: CarFeatures;
  vehicle_group: string;
  rates: CarRates;
  company_name: string;
  stars: number;
}

export interface CarFeatures {
  seats: string;
  large_suitcase: number;
  small_suitcase: number;
  category: string;
  doors: string;
  transmission: string;
  air_conditioning: boolean;
}

export interface PictureURL {
  normal: string;
  featured: string;
}

export interface CarsByCompany {
  [company: string]: Car[];
}

// Rates

export interface RateInclusions {
  name: string[];
  description: string[];
}

export interface RateData {
  name: string;
  net_rate: boolean;
  rate_type: string;
  inclusions: RateInclusions;
  step_one: boolean;
}

export interface CurrencyChargeDetail {
  total_charge: {
    base: {
      total_amount: string;
      estimated_total_amount: string;
      estimated_total_amount_without_equipment_amount: string;
      pp: {
        prepaid_amount: string;
        paid_on_destination_amount: string;
      };
      pd: {
        prepaid_amount: string;
        paid_on_destination_amount: string;
      };
    };
    discounts: null | any;
    total: {
      total_amount: string;
      estimated_total_amount: string;
      estimated_total_amount_without_equipment_amount: string;
      pp: {
        prepaid_amount: string;
        paid_on_destination_amount: string;
      };
      pd: {
        prepaid_amount: string;
        paid_on_destination_amount: string;
      };
    };
  };
}

export interface RatePricing {
  COP: CurrencyChargeDetail;
  USD: CurrencyChargeDetail;
}

export interface CarRate {
  rate_data: RateData;
  pricing: RatePricing;
}

export interface CarRates {
  [rateCode: string]: CarRate;
}
