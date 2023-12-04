import React from 'react';
import { Image } from 'antd';
import { uuid, isArray, isFunction } from '@ihccc/utils';
import Item from './item';
import useStyles from './style';

export const defaultFallback =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAgCAYAAACLmoEDAAAEYUlEQVRYR9WXW2icVRDH//MlxKRewEtUxD4pjUiCl2rBYtwz3xoTW7UWtb5osSJVEFGLD603LNiKQitKvVAptlQQqtXqw2oa98zZjZFG01brBcQHUQQVLGKbB113z8iRJCxr8u23a1LIvOzDmTPn9838z8xZwjwymkesmHPYYrHYCaCzUqmcXS6XD/f19f3RbILmDNZau5aI1gJYXA1HREdU9TCAYWbe0Qj4rMPm8/klURS9XAX5gar+oqo/RlHUBaCLiLpUdQER5Ywxy9MCzyqstXYZEe0CcBaAvUT0gjFmuBZGRC4E8CKA68Oaql4ax/EX9aCbhi0UCpd57w957xdns9lDIyMjF5RKpQMB1Hu/MZvNPlXvcBF5CMDzAH5j5qDtRGsaVkTGAZwM4C8AFwF4DMA9aUEnqURkPYBn0uxrCtZau5GIngSwE8BdVb+jnZ2d13R3d5fqZal6XUSOAOjx3vdns9n9M+1tGFZETgFwnIiOqeolRPS+qvZMaO/mOI7fawQ0+Drn1qnqFgDrmfnZWYO11o4S0RIADzDzNmvtLUT0NoBfvferstlssVHYfD6/NIqiEVXdE8fx7bMCKyJ3ANgN4ENm/vcmB7PWbiaiDQCGACxj5nKjwM65o6p6lJkXzQrsRMAzAFzFzOHmT5m1dpCIrgOwhZkfaQL2oKp2MXOQ2bSWWrPOuR2qejeAp5n5idpoInJFyDiAM4lotTEmVOA/JiI3ADinenrlcrmTOjo6jgP4nJmDxJqHLRaLSyqVyiiAPwGcOlOZReR+ANsAfAfgcmYO7W3KRKQbQKhIaHlTH10oFJZ670dCV2HmNf8LVkTCpekFsJKZ9yWVWERen2hne5n51hrYTwFcCeAnAOdHUbQ8k8nknHNbVfVhVb03juPtTcNOthUi2m+M6a+nxbGxsQXj4+MHQjsLDxljzGthz+RHENH2crm8s6Wl5RMAXwG4EcD34QOYeWFS/ETNDg8Pn14ul78BcC6AhcwcMlLXnHOsqpaI/lbV84hojao+B2CQmQdCAOdcyOTWyYFCROuMMWH0zmiJsCLyCoD7ADzOzJvqUlY5WGs3ENHmkFQADODr1tbW3t7e3t8n3ay1e4joNiLabYxZXS/+jLDW2n4iCre7wsyt9QJNty4iQd8rVPUYgDiO44M1Gg4V+yzol4hWGWPeaiqzIhIa/LXe+0wzU2lCpwEmVGfXTBezUCjc5L0PI/oHAFcnSW3azDrnVqrqO0FazBxKOKfmnNukqo/We3lNC1ssFi+uVCovnQjQav1GUfSuMebNplvXnKa0weD1ukG4yWaamN82eE61e/gfVmsfM3MYOomWBEsiEkSf1Kgr9Q6oWm9J8P0ZwKLa8Vzrn/oh0wDUnLmmhh0aGuppa2ubVZBMJvNlIwFTwVprVxBR4gOmkUOrfO9k5jfS7k0Fm8vlTmtvb381iqLwkPkobfAEvwHv/WCpVHpwYGAg6DWVpYJNFekEOM0r2H8AKF7PMAi72Z0AAAAASUVORK5CYII=';

const ImageList = ({
  className,
  size,
  data,
  getSource,
  fallback,
  extra,
  itemExtra,
  children,
  ...restProps
}) => {
  const { styles, cx } = useStyles();

  const RenderedList = React.useMemo(() => {
    return (
      <Image.PreviewGroup>
        {React.isValidElement(children) &&
          (isArray(data) ? data : []).map((item, index) =>
            React.cloneElement(
              children,
              {
                item,
                index,
                size,
                extra: isFunction(itemExtra) ? itemExtra(item, index) : void 0,
                key: uuid('image'),
              },
              <Image
                src={isFunction(getSource) ? getSource(item) : item}
                fallback={fallback}
                alt="image"
              />,
            ),
          )}
      </Image.PreviewGroup>
    );
  }, [data]);

  return (
    <div className={cx(styles, 'bc-image-list', className)} {...restProps}>
      {RenderedList}
      {React.isValidElement(extra)
        ? React.cloneElement(extra, { size })
        : extra}
    </div>
  );
};

ImageList.Item = Item;

ImageList.defaultProps = {
  size: 'middle',
  data: [],
  fallback: defaultFallback,
  children: <Item />,
};

export default ImageList;
