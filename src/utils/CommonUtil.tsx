/**
 * Formats the given data for "welcome" section in desired format.
 * So that In future if response format changes, we don't have to change the UI bindings.
 */
export const getFormattedWelcomeData = (data: any) => {
  const welcomeOptions: any = [];
  let userDetails: any = {};
  (data || []).forEach((item: any = {}) => {
    if (item?.type === "suggestion") {
      welcomeOptions.push({ text: item?.data, id: item?.data, ...item });
    } else if (item.type === "user_role") {
      userDetails = { name: item?.data?.name, ...item.data };
    }
  });
  return {
    welcomeOptions: welcomeOptions,
    userDetails: userDetails,
  };
};

export const getFormattedChatData = (
  data: any,
  oldChatData: any = [],
  oldTagsData: any = []
) => {
  let tagsList: any = [...oldTagsData];
  let chatList: any = [...oldChatData];
  (data || []).forEach((item: any = {}, index: any) => {
    if (item.type === "user" && item.data) {
      chatList.push({
        msg: item.data,
        reqId: item.reqId,
        type: item.type,
        isReply: false,
      });
    } else if (item.type === "assistant" && item.data) {

      if (item.reqId) {
        const index = chatList.findIndex((rec: any) => {
          return rec.reqId === item.reqId && rec.type === item.type;
        });
        if (index > -1) {
          let obj = {
            ...chatList[index],
            msg: item.data,
          };
          chatList[index] = obj;
        } else {
          chatList.push({
            msg: item.data,
            reqId: item.reqId,
            type: item.type,
            isReply: true,
          });
        }
      } else {
        chatList.push({
          msg: item.data,
          reqId: item.reqId,
          type: item.type,
          isReply: true,
          suggest: item.suggest ? item.suggest : [],
        });
      }
    } else if (item.type === "tag" && item.data) {
      const isWaitingIndex = chatList.findIndex((rec: any) => rec.isWaiting);
      if (isWaitingIndex > -1) {
        chatList.splice(isWaitingIndex, 1);
      }
      if (
        tagsList?.length > 0 &&
        item?.reqId !== tagsList[tagsList?.length - 1]?.reqId
      ) {
        tagsList = [];
      }
      if (Array.isArray(item.data)) {
        //When we get the data from chat-history
        tagsList = [...item.data];
      } else {
        tagsList.push({ ...item.data, reqId: item.reqId });
      }
    }
  });
  return { chatList: chatList, tagsList: tagsList };
};

/**
 * Formatting the hostory data into sub groups (Today, yesterday, This week..etc) based on date/timestamp
 * @param data - Array of chat history data
 * @returns Grouped data
 * @author Srinivas Nadendla
 */
export const getFormattedChatHistory = (data: any) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const currentWeek = new Date(today);
  currentWeek.setDate(currentWeek.getDate() - 7);

  const formattedData: any = [];
  if (data?.length > 0) {
    data.forEach((rec: any) => {
      if (rec.name && rec.name.length > 0) {
        let groupName = "";
        let recDate = new Date(rec?.date)?.toDateString();

        if (recDate === today.toDateString()) {
          groupName = "Today";
        } else if (recDate === yesterday.toDateString()) {
          groupName = "Yesterday";
        } else if (new Date(rec?.date) > currentWeek) {
          groupName = "This Week";
        } else {
          groupName = `${new Date(rec.date).toLocaleString("default", {
            month: "long",
          })}, ${new Date(rec.date).getFullYear()}`;
        }
        const index = formattedData.findIndex(
          (item: any) => item.groupName === groupName
        );
        if (index === -1) {
          formattedData.push({
            groupName: groupName,
            records: [rec],
          });
        } else {
          formattedData[index].records.push(rec);
        }
      }
    });
    return formattedData;
  }
};

export const getFormattedHelpData = (data: any = [], oldHelpData: any = {}) => {
  let helpData: any = { ...oldHelpData };
  (data || []).forEach((item: any, index: any) => {
    if (item.type === "html" && item.data) {
      if (Array.isArray(item.data)) {
        //For data comes from chat-history
        helpData.html = item.data.join("");
      } else {
        if (helpData.reqId === item.reqId) {
          helpData.html = (helpData[index].html || "") + item.data;
        } else {
          helpData.html = item.data;
        }
      }
    }
  });
  return helpData;
};

export const getFormattedReportData = (
  records: any = [],
) => {
  if (records?.length && records[0].data?.length) {
    return records[0].data;
  } else {
    return [];
  }
};

/**
 *
 * @param dateVal
 * @returns ex: 05-27-2015 10:35 AM format
 */
export const formatDate = (dateVal: any) => {
  const newDate = new Date(dateVal);

  const sMonth = padValue(newDate.getMonth() + 1);
  let sDay = padValue(newDate.getDate());
  let sYear = newDate.getFullYear();
  let sHour: any = newDate.getHours();
  let sMinute = padValue(newDate.getMinutes());
  let sAMPM = "AM";

  let iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
    sAMPM = "PM";
    sHour = iHourCheck - 12;
  } else if (iHourCheck === 0) {
    sHour = "12";
  }

  sHour = padValue(sHour);

  return (
    sMonth +
    "-" +
    sDay +
    "-" +
    sYear +
    " " +
    sHour +
    ":" +
    sMinute +
    " " +
    sAMPM
  );
};

export const padValue = (value: any) => {
  return value < 10 ? "0" + value : value;
};

export const SECTIONS_TO_SHOW_SUGGESTIONS = [
  "recommend",
  "search",
  "help",
  "report",
  'query',
  'finance'
];
export const SECTIONS_TO_KEEP_CHAT_AS_ACTIVE = [
  "chat",
  "search",
  "recommend",
  "help",
  "report",
  'query',
  'finance'
];

export const SUGGETSION_PANEL_SECTIONS = [
  "search",
  "recommend",
  "help",
  "report",
  'query',
  'finance'
]

export const SECTIONS_WITHOUT_SUGGESTIONS = [
  'welcome',
  'chat_history'
];
export const SECTIONS_NEED_EXTRA_WIDTH = ["report", "help", "finance"];

export const getFormattedQueryItems = (data: any)=> {
    let formattedItems: any = [];
    (data || []).forEach((rec: any)=>{
      formattedItems.push({
        name: rec.Name,
        id: rec.Id,
        desc: '',//TODO:
        stage: rec.StageName,
        stageColor: rec.StageColor,
        modifiedBy: rec.AssignedContacts,
        isQuery: true,//To differentiate Query Items and smartItems
      })
  
    });
    return formattedItems;
}

/**
 * 
 * @param colorCode hex or rgb color
 * @returns whether the given color is light/dark
 * @author Srinivas Nadendla
 */
export const checkLightOrDark = (colorCode: any) => {
  let r, g, b, hsp;
  //block for rgb
  if (colorCode.match(/^rgb/)) {
    colorCode = colorCode.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = colorCode[1];
    g = colorCode[2];
    b = colorCode[3];
  } else {
    //Block for hex values
    colorCode = +(
      "0x" + colorCode.slice(1).replace(colorCode.length < 5 && /./g, "$&$&")
    );

    r = colorCode >> 16;
    g = (colorCode >> 8) & 255;
    b = colorCode & 255;
  }
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
};

export const getFormattedFinanceData = (data: any = [], oldFinanceData: any = {}) => {
  let financeData: any = { ...oldFinanceData };
  (data || []).forEach((item: any, index: any) => {
    if (item.type === "budget" && item.data) {
      if (Array.isArray(item.data)) {
        //For data comes from chat-history
        financeData.html = item.data.join("");
        financeData.reqId = item.reqId;
        financeData.session = item.session;
      } else {
        if (financeData.reqId === item.reqId) {
          financeData.html = (financeData[index].html || "") + item.data;
        } else {
          financeData.html = item.data;
          financeData.reqId = item.reqId;
          financeData.session = item.session;
        }
      }
    }
  });
  return financeData;
};

export const SUB_TYPES_MAPPING_LIST:any = {
  'gantter': 'Schedule',
  'board_list': 'Current Plan Board',
  'board_dispatch':'Current Dispatch Board',
  'task_list': 'List View',
  'board_plan': 'Current Plan Board',
  'calendar_list': 'Calendar View',
  'resource_list': 'Resource List',
  'board_split': 'Split Board',
  'schedule': 'Schedule'
}

export const getFormattedBreadCrumbsData = (data: any = {}) => {
  if (Object.keys(data).length) {
    let formattedData: any = [];
    if (data.type || data?.display?.type) {
      let obj: any = {
        name: data?.display?.type || data.type?.toUpperCase(),//TODO: need to remove once danilo adds a key to boards/cpmSchedule
        type: data.type
      };
      formattedData.push(obj);
      let subTypeText = data.display?.hasOwnProperty("sub_type")
        ? data.display.sub_type
        : data.sub_type;
      if (subTypeText && subTypeText !== 'other') {
        if (SUB_TYPES_MAPPING_LIST[subTypeText]) {
          subTypeText = SUB_TYPES_MAPPING_LIST[subTypeText];
        }
        formattedData.push({
          name: subTypeText,
        });
        if (data.item_ids && data.item_ids.length > 0) {
          formattedData.push({name: "Selected Items"});
        }
      }
    }
    return formattedData;
  } else {
    return [];
  }
};
