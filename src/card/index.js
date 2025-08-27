import { Divider } from 'antd';
import Item from '../data-item';
import Card, { Base, Header, Cover, Body, Footer } from './card';
import Meta from './media';

Card.Item = Item;
Card.Base = Base;
Card.Header = Header;
Card.Cover = Cover;
Card.Body = Body;
Card.Footer = Footer;
/** @deprecated 使用 Card.Meta 替代 */
Card.Media = Meta;
Card.Meta = Meta;
Card.Divider = Divider;

export default Card;
