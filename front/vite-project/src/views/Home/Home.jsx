import styles from './Home.module.css';
import gestorTurnos from '../../assets/gestionTurnos.png';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className= {styles.info}>
                <h1>Ahora agendar turnos para tus consultas es mucho mas facil.</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore ad, temporibus quo hic facere exercitationem obcaecati necessitatibus. Magni, officia quos. Magnam, modi. Cupiditate omnis nisi magnam libero, culpa blanditiis perferendis.</p>
                <div className={styles.infoContainer}>
                    <div>
                        <h2>Gestiona tus turnos</h2>
                        <div className={styles.infoTextImage}>
                            <img src={gestorTurnos} alt="gestorTurnos"/>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore iusto sunt autem facilis! Minima voluptates dignissimos est 
                                voluptatibus quam sed nam, molestias facilis provident quae ipsa quaerat cumque distinctio 
                                vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, quia error
                                rem hic, repellendus blanditiis cumque quis asperiores deleniti at.
                                Eaque perspiciatis debitis recusandae et? Dolorem sint vero fugit. Lorem ipsum dolor sit 
                                amet consectetur adipisicing elit. Expedita, non totam deleniti saepe perspiciatis sunt illo, dolore repellendus fugit atque dolorum odit
                                maiores esse a aliquam molestiae eveniet distinctio nostrum?</p>
                        </div>
                    </div>
                    <div>
                        <h2>¿Como funciona?</h2>
                        <div className={styles.infoTextImage}>
                            <img src={gestorTurnos} alt="gestorTurnos"/>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore iusto sunt autem facilis! Minima voluptates dignissimos est 
                                voluptatibus quam sed nam, molestias facilis provident quae ipsa quaerat cumque distinctio 
                                vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, quia error
                                rem hic, repellendus blanditiis cumque quis asperiores deleniti at.
                                Eaque perspiciatis debitis recusandae et? Dolorem sint vero fugit. Lorem ipsum dolor sit 
                                amet consectetur adipisicing elit. Expedita, non totam deleniti saepe perspiciatis sunt illo, dolore repellendus fugit atque dolorum odit
                                maiores esse a aliquam molestiae eveniet distinctio nostrum?</p>
                        </div>
                    </div>
                    <div>
                        <h2>Explora por la pagina</h2>
                        <div className={styles.infoTextImage}>
                        <img src={gestorTurnos} alt="gestorTurnos"/>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore iusto sunt autem facilis! Minima voluptates dignissimos est 
                                voluptatibus quam sed nam, molestias facilis provident quae ipsa quaerat cumque distinctio 
                                vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium alias, quia error
                                rem hic, repellendus blanditiis cumque quis asperiores deleniti at.
                                Eaque perspiciatis debitis recusandae et? Dolorem sint vero fugit. Lorem ipsum dolor sit 
                                amet consectetur adipisicing elit. Expedita, non totam deleniti saepe perspiciatis sunt illo, dolore repellendus fugit atque dolorum odit
                                maiores esse a aliquam molestiae eveniet distinctio nostrum?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
