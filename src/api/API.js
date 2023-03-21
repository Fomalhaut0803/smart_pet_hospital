class API {
  url={
    allBooking: 'booking/findAll', // 预约记录
    addBooking: 'booking/addBooking', // 新增预约
    deleteBooking: 'booking/deleteBooking', // 取消预约
    findBooking: 'booking/find', // 模糊查询预约记录

    allCases: 'cases/findAll', // 所有病历
    addCases: 'cases/addCases', // 新增病历单
    findCases: 'cases/find', // 模糊查询病历

    allSurgery: 'surgery/findAll', // 手术记录
    addSurgery: 'surgery/addSurgery', // 新增手术记录
    deleteSurgery: 'surgery/deleteSurgery', // 删除手术记录
    findSurgery: 'surgery/find', // 模糊查询手术记录

    allOperating: 'operating/findAll', // 手术室
    addOperating: 'operating/addOperating', // 新增手术室
    deleteOperating: 'operating/deleteOperating', // 删除手术室
    findOperating: 'operating/find', // 模糊查询手术室

    allPet: 'pet/findAll', // 所有宠物
    addPet: 'pet/addPet', // 新增宠物
    deletePet: 'pet/deletePet', // 删除宠物
    findPet: 'pet/find', // 模糊查询宠物

    allAdopt: 'adopt/findAll', // 领养记录
    addAdopt: 'adopt/addAdopt', // 新增领养记录
    deleteAdopt: 'adopt/deleteAdopt', // 删除领养记录
    findAdopt: 'adopt/find', // 模糊查询领养记录

    allPurchase: 'purchase/findAll', // 进货记录
    addPurchase: 'purchase/addPurchase', // 新增进货记录
    updatePurchase: 'purchase/updatePurchase', // 修改进货记录
    deletePurchase: 'purchase/deletePurchase', // 删除进货记录
    findPurchase: 'purchase/find', // 模糊查询进货记录

    allSupplies: 'supplies/findAll', // 宠物用品
    addSupplies: 'supplies/addSupplies', // 新增宠物用品
    deleteSupplies: 'supplies/deleteSupplies', // 删除宠物用品
    findSupplies: 'supplies/find', // 模糊查询宠物用品

    allOrders: 'orders/findAll', // 订单
    addOrders: 'orders/addOrders', // 新增订单
    deleteOrders: 'orders/deleteOrders', // 退单
    findOrders: 'orders/find', // 模糊查询订单

    allMedicine: 'medicine/findAll', // 药品
    addMedicine: 'medicine/addMedicine', // 新增药品
    deleteMedicine: 'medicine/deleteMedicine', // 删除药品
    findMedicine: 'medicine/find', // 模糊查询药品

    allVendor: 'vendor/findAll', // 供应商
    addVendor: 'vendor/addVendor', // 新增供应商
    deleteVendor: 'vendor/deleteVendor', // 删除供应商
    findVendor: 'vendor/find', // 模糊查询供应商

    allUser: 'user/findAll', // 用户
    addUser: 'user/addUser', // 新增用户
    deleteUser: 'user/deleteUser', // 删除用户
    findUser: 'user/find', // 模糊查询用户

    allDoctor: 'doctor/findAll', // 医生
    addDoctor: 'doctor/addDoctor', // 新增医生
    deleteDoctor: 'doctor/deleteDoctor', // 删除医生
    findDoctor: 'doctor/find' // 模糊查询医生

  }
}

export default API
