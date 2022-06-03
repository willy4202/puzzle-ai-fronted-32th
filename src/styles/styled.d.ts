import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    mainBorder: string;
    mainArrow: string;
    mainDisable: string;

    //REZList—————————————
    REZListBorder: string;
    REZListTime: string;
    REZListBtnBorder: string;
    REZListBtnBack: string;
    REZListBtnFont: string;

    //DOCScheme———————————-
    DOCSchemeCalBtn: string;
    DOCSchemeCalFont: string;
    DOCSchemeCaloff: string;
    DOCSchemeTimeback: string;
    DOCSchemeTimeBorder: string;
    DOCSchemeTimeFont: string;
    DOCSchemeTimeChkBorder: string;
    DOCSchemeTimeChkback: string;
    DOCSchemeTimeChkFont: string;
    DOCSchemeFooter: string;
    DOCSchemeCalWeek: string;
    DOCSchemeCalChkBack: string;
    DOCSchemeCalChkFont: string;

    //MakeREZ——————————————-
    MakeREZTimeFont: string;
    MakeREZTimeBack: string;
    MakeREZInputFont: string;
    MakeREZInputBack: string;

    //REZSubmit——————————————
    REZSubmitTitle: string;
    REZSubmitFont: string;
    REZSubmitFooter: string;
    REZSubmitBorder: string;

    //REZDetail———————————————-
    REZDetailFont: string;

    //Cardcomponent————————————
    CardDoc: string;
    CardHospital: string;

    //ButtonComponent———————————-
    ButtonActive: string;
    ButtonDisable: string;

    //StatusComponent————————————-
    StatusWaitingBorder: string;
    StatusWaitingFont: string;
    StatusWaitingBack: string;
    StatusCancleBorder: string;
    StatusCancleFont: string;
    StatusCancleBack: string;
    StatusFinBorder: string;
    StatusFinFont: string;
    StatusFinBack: string;

    //Login//Signup————
    grey: string;
    red: string;

    //폰트
    fontLarge: string;
    fontMedium: string;
    fontRegular: string;
    fontSmall: string;

    weightBold: number;
    weightRegular: number;

    lineHeightLarge: string;
    lineHeightRegular: string;
    lineHeightSmall: string;
  }
}
