import Header from "@/components/Layaout/components/Header";
import style from "./layaout.module.scss"
export default function Layaout({ children }) {
  return (
    <div className={style.layout}>
       <Header className={style.header} />
      <main>{children}</main>
    </div>
  );
  
}
