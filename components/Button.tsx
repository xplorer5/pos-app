import React from 'react'
import Image from 'next/image'
type ButtonProps={
  type:'button'|'submit';
  title: string;
  icon?:string;
  variant:'btn_dark_green'|'btn_white';
  onClick?: () => void;
}

const Button = ({type,title,icon,variant,onClick}:ButtonProps) => {
  return (
    <button 
    className={`flexCenter gap-1 rounded-full border ${variant}`}
    type={type}
    onClick={onClick}>
      {icon && <Image src={icon} 
      alt={title || 'Button icon'} width={50} height={50}
      />}
      <label className="bold-16 whitespace-nowrap">{title}</label>
    </button>
  )
}

export default Button