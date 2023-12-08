/* eslint-disable react/jsx-pascal-case */
import { Table } from '@blockium/table';
import { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';
import { RevenueTopToolbar } from './RevenueTopToolbar';
import { useCallback, useMemo, useState } from 'react';
import { localeContains } from '@blockium/utils';

export interface IRevenue {
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

export const Revenue: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const dataArray: IRevenue[] = useMemo(() => {
    const newDataArray = [];
    for (let i = 1; i <= 22; i++) {
      const record: IRevenue = {
        id: `record_${i}`,
        creationTime: new Date().toJSON(),
        serviceId: `service_${i}`,
        serviceName: `Service ${i}`,
        servicePrice: Math.random() * 100,
        servicePriceOriginal: Math.random() * 100,
        serviceFeePercent: Math.random() * 10,
        serviceDate: new Date().toJSON(),
        serviceDone: i % 2 === 0, // alternates between true and false
        customerId: `customer_${i}`,
        customerName: `Customer ${i}`,
        payTypeId: `payType_${i}`,
        payTypeName: `Payment Type ${i}`,
        payTypeFeePercent: Math.random() * 5,
        placeId: `place_${i}`,
        placeName: `Place ${i}`,
        partnerEmail: `partner${i}@example.com`,
        partnerName: `Partner ${i}`,
        discountPercent: Math.random() * 20,
        duration: i % 3 === 0 ? null : `${i} hours`,
        payParcelQuantity: i % 2 === 0 ? 1 : 3,
        notes: `Notes for record ${i}`,
      };

      newDataArray.push(record);
    }
    return newDataArray;
  }, []);

  const columns: MRT_ColumnDef<IRevenue>[] = [
    {
      accessorKey: 'payTypeName',
      header: 'Pagamento',
    },
    {
      accessorKey: 'serviceName',
      header: 'Serviço',
    },
    {
      accessorKey: 'customerName',
      header: 'Cliente',
    },
  ];

  const filter = useCallback(() => {
    return dataArray.filter((data) => {
      const { payTypeName, serviceName, customerName } = data;
      return (
        (payTypeName && localeContains(payTypeName, searchValue)) ||
        (serviceName && localeContains(serviceName, searchValue)) ||
        (customerName && localeContains(customerName, searchValue))
      );
    });
  }, [dataArray, searchValue]);

  const onEditClick = () => void 0;
  const onDeleteClick = () => void 0;

  return (
    <Table
      data={filter()}
      columns={columns}
      // height={500}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      // enableColumnPinning
      // enableRowPinning
      initialState={{
        columnPinning: { left: ['payTypeName'] },
      }}
      renderTopToolbar={({ table }: { table: MRT_TableInstance<IRevenue> }) => {
        return <RevenueTopToolbar table={table} />;
      }}
      // manualFiltering // To be used on server searching
      onGlobalFilterChange={(searchValue: string) => {
        setSearchValue(searchValue || '');
      }}
      // filterFns={{
      //   myCustomFilterFn: (row: MRT_Row, id: string, filterValue: string) => {
      //     const data = row.original;
      //     const value = row.getValue<string>(id);
      //     return localeContains(value, filterValue);
      //   },
      // }}
      // globalFilterFn="myCustomFilterFn"

      // bottomGap={isMobile ? 120 : 80}
    />
  );
};
