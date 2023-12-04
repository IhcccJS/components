import { isFunction } from '@ihccc/utils';
import presetButtons from './preset';

function revertValue(fields, ...args) {
  const source = this;
  fields.forEach((key) => {
    if (isFunction(source[key])) source[key] = source[key](...args);
  });
}

export function handleButtonConfig(items, data, type) {
  const buttonList = [];
  const groupStore = {};

  for (let index = 0; index < items.length; index++) {
    let btn = items[index];
    if (!btn.key) continue;

    btn = Object.assign({}, presetButtons[btn.preset || btn.key], btn);

    revertValue.call(btn, ['hidden', 'tip', 'confirm', 'props'], data);

    if (!!btn.onClick) {
      if (!type && !btn.type) btn.type = 'a';
      btn.onClick = btn.onClick.bind(btn, data);
    } else if (!!btn.onSwitch) {
      if (!btn.type) btn.type = 'switch';
      btn.onChange = btn.onSwitch.bind(btn, data);
    } else if (!!btn.onConfirm) {
      if (!type && !btn.type) btn.type = 'a';
      btn.onConfirm = btn.onConfirm.bind(btn, data);
    }

    if (type !== 'button' && btn.type !== 'button') {
      delete btn.group;
    }

    if (!btn.hidden) {
      if (
        (btn.group && (btn.type === 'button' || type === 'button')) ||
        btn.dropdown
      ) {
        let saveGroupInfo = groupStore[btn.group];
        let saveDropdownInfo = groupStore[btn.dropdown];

        let btnIndex;

        if (btn.dropdown && saveDropdownInfo) {
          btnIndex = saveDropdownInfo.btnIndex;
          const groupIndex = saveDropdownInfo.groupIndex;
          if (groupIndex > -1) {
            if (saveDropdownInfo.group) {
              buttonList[groupIndex][btnIndex][1].items.push(btn);
            } else {
              buttonList[groupIndex][btnIndex].items.push(btn);
            }
          } else {
            buttonList[btnIndex][1].items.push(btn);
          }
          continue;
        }

        if (btn.group && saveGroupInfo && !btn.dropdown) {
          btnIndex = saveGroupInfo.btnIndex;
          buttonList[btnIndex].push(btn);
          continue;
        }

        if (btn.group && !saveGroupInfo) {
          buttonList.push([{ key: btn.group, type: 'group' }]);
          btnIndex = buttonList.length - 1;
          groupStore[btn.group] = { btnIndex };
          saveGroupInfo = groupStore[btn.group];
          if (!btn.dropdown) {
            buttonList[btnIndex].push(btn);
            continue;
          }
        }

        if (btn.dropdown && !saveDropdownInfo) {
          btn.items = [];
          let groupIndex;
          if (btn.group) {
            groupIndex = saveGroupInfo.btnIndex;
            buttonList[groupIndex].push([
              { key: btn.dropdown, type: 'dropdown' },
            ]);
            btnIndex = buttonList[groupIndex].length - 1;
            groupStore[btn.dropdown] = {
              btnIndex,
              groupIndex,
              group: btn.group,
            };
            saveDropdownInfo = groupStore[btn.dropdown];
            buttonList[groupIndex][btnIndex].push(btn);
          } else {
            buttonList.push([{ key: btn.dropdown, type: 'dropdown' }]);
            groupIndex = buttonList.length - 1;
            btnIndex = 1;
            groupStore[btn.dropdown] = { btnIndex, groupIndex };
            saveDropdownInfo = groupStore[btn.dropdown];
            buttonList[groupIndex].push(btn);
          }
        }
      } else {
        buttonList.push(btn);
      }
    }
  }

  return buttonList;
}
