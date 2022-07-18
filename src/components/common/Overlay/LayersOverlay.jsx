import React from "react";
import s from './LayersOverlay.module.css';

const LayersOverlay = (props) => {
  return (
    <div className={s.tile_menu}>
      <div className={s.drop_btn}>
        Layers
      </div>
      <div className={s.dropdown_content}>
        {props.overlay.map(layer => {
          return (
            <div 
              className={s.drop_item} 
              key={layer.key}
              onClick={ () => props.toggleLayer(layer.key) }
            > 
              <input 
                id={layer.name}
                type='checkbox' 
                name={layer.name} 
                checked={layer.isChecked}
                onChange={ () => {} }
              />
              <span>{layer.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LayersOverlay;