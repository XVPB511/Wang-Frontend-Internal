<template>
    <div class="quotation-info">
      <div class="left-column">
        <div class="row">
          <label>รหัสลูกค้า:</label>
          <span>{{ quotationData.customerId }}</span>
        </div>
        <div class="row">
          <label>นามร้าน:</label>
          <span>{{ quotationData.storeName }}</span>
        </div>
        <div class="row">
          <label>ที่อยู่:</label>
          <span>{{ quotationData.address }}</span>
        </div>
        <div class="row">
          <label>หมายเหตุ:</label>
          <span>{{ quotationData.note }}</span>
        </div>
        <div class="row">
          <label>QC:</label>
          <span>{{ quotationData.qcPack }}</span>
        </div>
      </div>
      <div class="right-column">
        <div class="row">
          <label>วันที่:</label>
          <span>{{ quotationData.date }}</span>
        </div>
        <div class="row">
          <label>เลขที่ใบกำกับ:</label>
          <span>{{ quotationData.invoiceNumber }}</span>
        </div>
        <div class="row">
          <label>พนักงานขาย:</label>
          <span>{{ quotationData.salesperson }}</span>
        </div>
        <div class="row">
          <label>ครบกำหนด:</label>
          <span>{{ quotationData.dueDate }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        quotationData: {
          customerId: '84321',
          storeName: 'ร้านแพรวพรรณเภสัช',
          address: '1/82 ม.6 ต.คอหงส์ อ.หาดใหญ่ จ.สงขลา 84320',
          note: '0210-347787 | เกษมสุข |',
          qcPack: '0283 | Pack 1088',
          date: '15/04/68',
          invoiceNumber: '6509438403',
          salesperson: '0210',
          dueDate: '15/04/68',
        },
      };
    },
  };
  </script>
  
  <style scoped>
  .quotation-info {
    display: flex;
    width: 100%;
    box-sizing: border-box;
  }
  
  .left-column {
    flex: 1;
    padding-right: 10px;
  }
  
  .right-column {
    flex: 1;
    padding-left: 10px;
  }
  
  .row {
    display: flex;
    align-items: baseline;
    margin-bottom: 5px;
  }
  
  .row label {
    width: 120px;
    font-weight: bold;
    margin-right: 5px;
    text-align: right;
  }
  
  .row span {
    flex: 1;
  }
  </style>