import React, { FC } from 'react'
import styles from './Logo.module.scss'
import LogoImg from '../assets/images/logo.png'

const Logo: FC = () => {
  return (
    <>
      <div className={styles['container']}>
        <img src={LogoImg} alt="logo" />
        <span>问卷星球</span>
      </div>
    </>
  )
}
export default Logo
