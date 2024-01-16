export interface ICustomerService {
  id?: string;
  creationTime: string; // A JSON Date and time representation. See Date.toJSON()
  serviceId?: string;
  serviceName?: string;
  servicePrice?: number;
  servicePriceOriginal?: number;
  serviceFeePercent?: number;
  serviceNetBalance?: number; // computed, discounting serviceFeePercent + payFeePercent
  serviceDate: string; // A JSON Date and time representation. See Date.toJSON()
  serviceDone?: boolean;
  customerId?: string;
  customerName?: string;
  payTypeId?: string;
  payTypeName?: string;
  payTypeFeePercent?: number;
  placeId?: string;
  placeName?: string;
  partnerEmail?: string;
  partnerName?: string;
  discountPercent?: number;
  duration?: string | null;
  payParcelQuantity?: number;
  notes?: string;
}
