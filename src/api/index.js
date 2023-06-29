import request from "@/utils/request";

/**
 * 获取表格数据
 * @returns {Promise<any>}
 */
export const getListData = () => request.get(`/plc_configs?page_size=1000`);

/**
 * 新增表格数据
 * @param {Object} data
 * @returns {Promise<any>}
 */
export const addListData = (data) =>
  request({
    method: "post",
    url: "/plc_config",
    data: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

/**
 * 更新表格数据
 * @param {Number} id
 * @param {Object} data
 * @returns {Promise<any>}
 */
export const updateListData = (id, data) =>
  request({
    method: "put",
    url: `/plc_config/${id}`,
    data: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

/**
 * 查询单个表格数据
 * @param {Number} id
 * @returns {Promise<any>}
 */
export const getSingleListData = (id) => request.get(`/plc_config/${id}`);

/**
 * 删除表格数据
 * @param {Number} id
 * @returns {Promise<any>}
 */
export const deleteListData = (id) => request.delete(`/plc_config/${id}`);

/**
 * 启动任务
 * @returns {Promise<any>}
 */
export const runTask = () => request.get("/run_task");

/**
 * 重建数据表单
 * @returns {Promise<any>}
 */
export const createDataTable = () => request.get("/createDataTable");
