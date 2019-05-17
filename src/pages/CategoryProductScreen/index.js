import React from 'react';
import {SYSTEM_ROUTES} from '../../constants';

export default function CategoryProductScreen(props) {
  return (
    <div>
      <text>Dashboard</text>
      <button onClick={() => props.history.push(SYSTEM_ROUTES.PURCHASE_LIST.routeTo)}>Navegar</button>
    </div>
  );
}
