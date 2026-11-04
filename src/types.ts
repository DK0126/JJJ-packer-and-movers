export type MovingType = 
  | 'Home Shifting'
  | 'Office Shifting'
  | 'Local Shifting'
  | 'Intercity Shifting'
  | 'Vehicle Transportation'
  | 'Loading & Unloading'
  | 'Packing & Unpacking'
  | 'Storage / Warehouse'
  | 'Commercial Shifting'
  | 'Other';

export type PropertyType =
  | '1 BHK'
  | '2 BHK'
  | '3 BHK'
  | '4 BHK'
  | 'Villa'
  | 'Office'
  | 'Warehouse / Commercial'
  | 'Vehicle Only'
  | 'Other';

export type ContactMethod = 'Phone' | 'WhatsApp' | 'Email';

export type EnquiryStatus = 
  | 'New'
  | 'Contacted'
  | 'Quoted'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface MovingEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp?: string;
  movingType: MovingType;
  pickupLocation: string;
  deliveryLocation: string;
  movingDate: string;
  propertyType: PropertyType;
  description?: string;
  additionalRequirements?: string;
  preferredContactMethod: ContactMethod;
  status: EnquiryStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessConfig {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  stats: {
    movesCompleted: string;
    citiesCovered: string;
    happyCustomers: string;
    customerRating: string;
  };
  announcement?: string;
}
