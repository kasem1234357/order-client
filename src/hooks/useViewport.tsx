import { useEffect, useState } from "react"
type sizeInfoType= {
  currentWidth: number;
  currentHeight: number;
  screenOrientation: 'LandScape' | 'Portait';
  userDevice: {
    deviceType: DeviceOS | undefined;
    isMobileDevice:boolean,
            isTabletDevice:boolean,
            isDesktopDevice:boolean,  
  };
}
export interface DeviceState {
  isDesktop: boolean
  desktopOS: DesktopOS | undefined
  isWindowsDesktop: boolean
  isLinuxOrUnixDesktop: boolean
  sizeInfo:sizeInfoType
  isMobile: boolean
  mobileOS: MobileOS | undefined
  isAndroidDevice: boolean
  isAppleDevice: boolean
  isUnknownMobileDevice: boolean

  isTablet: boolean
  isLandscapeOrientation: () => boolean
  isPortraitOrientation: () => boolean
}
// const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera || undefined

const screen = window?.screen
console.log(screen);

// Device typology

const isMobileDevice = (): boolean => {
  const regexs = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
  return regexs.some((b) => userAgent.match(b))
}

const isTabletDevice = (): boolean => {
  const regex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/
  return regex.test(userAgent.toLowerCase())
}

const isDesktopDevice = (): boolean => !isMobileDevice() && !isTabletDevice()

const isDesktop = isDesktopDevice()
const isMobile = isMobileDevice()
const isTablet = isTabletDevice()

// Device Operating System

enum MobileOS {
  Android = 'android',
  iOS = 'ios',
  Unknown = 'unknown',
  WindowsPhone = 'Windows Phone'
}

const getMobileOS = (): MobileOS | undefined => {
  if (isMobileDevice()) {
    if (/windows phone/i.test(userAgent)) return MobileOS.WindowsPhone
    else if (/android/i.test(userAgent)) return MobileOS.Android
    else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) return MobileOS.iOS

    return MobileOS.Unknown
  } else return undefined
}

enum DesktopOS {
  Linux = 'linux',
  MacOS = 'mac_os',
  Unix = 'unix',
  Unknown = 'unknown',
  Windows = 'windows'
}

const getDesktopOS = (): DesktopOS | undefined => {
  if (isDesktopDevice()) {
    if (userAgent.indexOf('Win') !== -1) return DesktopOS.Windows
    else if (userAgent.indexOf('Mac') !== -1) return DesktopOS.MacOS
    else if (userAgent.indexOf('X11') !== -1) return DesktopOS.Unix
    else if (userAgent.indexOf('Linux') !== -1) return DesktopOS.Linux

    return DesktopOS.Unknown
  } else return undefined
}

type DeviceOS = DesktopOS | MobileOS

const getDeviceOS = (): DeviceOS | undefined => getMobileOS() ?? getDesktopOS()

const mobileOS: MobileOS | undefined = getMobileOS()
const deviceOS = getDeviceOS()
const isAndroidDevice = deviceOS === MobileOS.Android
const isAppleDevice = deviceOS === MobileOS.iOS || deviceOS=== DesktopOS.MacOS
const isUnknownMobileDevice = deviceOS === MobileOS.Unknown

const desktopOS: DesktopOS | undefined = getDesktopOS()
const isWindowsDesktop = deviceOS === DesktopOS.Windows
const isLinuxOrUnixDesktop = deviceOS === DesktopOS.Linux || deviceOS === DesktopOS.Unix

// Device orientation
//@ts-ignore


const supportedScreenOrientation =
//@ts-ignore
  (screen?.orientation || {}).type ?? (screen as any).mozOrientation ?? (screen as any).msOrientation

const safariScreenOrientation: OrientationType =
  !screen?.orientation && matchMedia('(orientation: portrait)').matches ? 'portrait-primary' : 'landscape-primary'

const initialScreenOrientation = supportedScreenOrientation ?? safariScreenOrientation ?? 'portrait-primary'
let screenOrientation: OrientationType = initialScreenOrientation

if (screen.orientation) {
  screen.orientation.addEventListener(
    'change',
    (ev: Event) => (screenOrientation = (ev.target ?? ({} as any)).type)
  )
}

const isLandscapeOrientation = () => ['landscape-primary', 'landscape-secondary'].includes(screenOrientation)
const isPortraitOrientation = () => ['portrait-primary', 'portrait-secondary'].includes(screenOrientation)

export const useViewport = (): DeviceState => {
    const [sizeInfo,setSizeInfo]=useState<sizeInfoType>({
        currentWidth:window.innerWidth,
        currentHeight:window.innerHeight,
        screenOrientation:isLandscapeOrientation()?'LandScape':'Portait',
        userDevice:{
            deviceType:getDeviceOS(),
            isMobileDevice:isMobile,
            isTabletDevice:isTablet,
            isDesktopDevice:isDesktop,  
        }
    })
    const updateSize =()=>{
        setSizeInfo(prev =>({
            ...prev,
            currentWidth:window.innerWidth,
            currentHeight:window.innerHeight
        }))
    }
    const updateOrientation =(ev:Event)=>{
         screenOrientation = (ev.target ?? ({} as any)).type
          setSizeInfo(prev =>({
            ...prev,
            screenOrientation:['landscape-primary', 'landscape-secondary'].includes((ev.target ?? ({} as any)).type)?"LandScape":"Portait"
          }))
    }
useEffect(()=>{
   window.addEventListener('resize',updateSize)
   if (screen.orientation) {
  screen.orientation.addEventListener(
    'change',
    updateOrientation
  )
}
   return ()=>{
    window.removeEventListener('resize',updateSize)
    if (screen.orientation) {
  screen.orientation.removeEventListener(
    'change',
    updateOrientation
  )
}
}
},[])
    return({
  isDesktop,
  desktopOS,
  isWindowsDesktop,
  isLinuxOrUnixDesktop,
  isMobile,
  mobileOS,
  sizeInfo,
  isAndroidDevice,
  isAppleDevice,
  isUnknownMobileDevice,
  isTablet,
  isLandscapeOrientation,
  isPortraitOrientation
})}