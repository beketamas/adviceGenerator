import './style.css'
import dividerDesktop from '../../images/pattern-divider-desktop.svg'
import dividerMobile from '../../images/pattern-divider-mobile.svg'
import icon from '../../images/icon-dice.svg'
import { useEffect, useState } from 'react'


type AdviceType={
    id:number;
    advice:string;
}

const Advice = () => {

    const[advice, setAdvice] = useState<AdviceType|null>(null)


    const fetchQuestion = async () => {
        try{
            const response = await fetch('https://api.adviceslip.com/advice')
            if (!response.ok) {
                throw new Error
            }
            const data = await response.json();
            console.log(data.slip)
            setAdvice(data.slip)
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchQuestion()
    },[])

  return (
    <div className='box'>
        <div className='card'>
            {advice ? (
                <>
                    <h2 className='advice_title'>Advice #{advice?.id}</h2>
                        <div className='advice-container'>
                            <p className='advice'>
                            {advice?.advice}
                            </p>
                        </div>
                </> ) 
                : (<p>Loading...</p>)}

            <div className='imgContainer'>
                <img src={dividerDesktop} alt='desktop' className='dividerDesktop'></img>
                <img src={dividerMobile} alt='mobile' className='dividerMobile'></img>
            </div>
            <div className='icon-conatiner'>
                <div className='icon' onClick={fetchQuestion}>
                    <img src={icon} alt='icon'></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Advice