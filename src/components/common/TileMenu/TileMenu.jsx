import React from "react";
import s from './TileMenu.module.css';

const TileMenu = (props) => {
  return (
    <div className={s.tile_menu}>
      <div className={s.drop_btn}>
        {props.tiles.find(tile => tile.isChecked).name}
      </div>
      <div className={s.dropdown_content}>
        {props.tiles.map(tile => {
          return (
            <div 
              className={s.drop_item} 
              key={tile.key}
              onClick={ () => props.setTileLayer(tile.key) }
            > 
              {tile.name} 
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TileMenu;