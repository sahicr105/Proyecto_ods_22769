import { useState } from "react";

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  reauthenticateWithPopup,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, provider, db } from "../firebase";
import Navbar from "../components/Navbar";
import eco from "../assets/form.jpg";


function Login() {

  const [register, setRegister] = useState(false);


  // LOGIN
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  // REGISTRO
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");



  // GOOGLE LOGIN + VERIFICACION
  const loginGoogle = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        provider
      );


      // fuerza una nueva verificación
      await reauthenticateWithPopup(
        result.user,
        provider
      );


      alert(
        "Sesión iniciada: " + result.user.email
      );


    } catch(error){

      console.error(error);

      alert(
        "No se pudo verificar la cuenta"
      );

    }

  };




  // LOGIN EMAIL
  const loginEmailPassword = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );


    } catch(error){

      console.error(error);

      alert(
        "Correo o contraseña incorrectos"
      );

    }

  };





  // REGISTRO
  const registrar = async () => {


    if(
      !nombre ||
      !correo ||
      !password ||
      !confirmar
    ){

      return alert(
        "Complete todos los campos"
      );

    }



    if(password !== confirmar){

      return alert(
        "Las contraseñas no coinciden"
      );

    }




    const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,}$/;



    if(!passwordRegex.test(password)){


      return alert(
        "La contraseña debe tener mínimo 8 caracteres, 1 letra, 1 número y 1 símbolo"
      );

    }





    try {


      const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        correo,
        password
      );


      const user = userCredential.user;




      await updateProfile(user, {

        displayName: nombre,

      });





      await setDoc(
        doc(db,"usuarios",user.uid),
        {

          nombre,
          correo,
          uid:user.uid,

          botellas:0,
          bolsas:0,
          desperdicios:0,
          total:0,

          primerImpacto:null

        }

      );



      alert(
        "Cuenta creada exitosamente"
      );



    }catch(error){


      console.error(error);


      alert(
        "Error al crear cuenta"
      );

    }


  };







  return (

    <>


    <Navbar />


    <div className="min-h-screen pt-24 grid md:grid-cols-2 bg-[#f5f5f0]">



      <div className="hidden md:flex items-center justify-center p-4">


        <img

          src={eco}

          alt="eco"

          className="w-full h-[90vh] object-cover rounded-3xl"

        />


      </div>






      <div className="flex items-center justify-center px-8 py-10">


      <div className="w-full max-w-md">



      {!register ? (



      <>



      <h1 className="text-5xl font-black mb-4">

      LOGIN

      </h1>




      <p className="text-gray-600 mb-10 text-lg">

      Ingrese sus datos para iniciar sesión

      </p>




      <div className="space-y-5">



      <input

      type="email"

      placeholder="Correo"

      value={loginEmail}

      onChange={(e)=>
      setLoginEmail(e.target.value)
      }

      className="w-full p-4 rounded-lg border bg-white"

      />




      <input

      type="password"

      placeholder="Contraseña"

      value={loginPassword}

      onChange={(e)=>
      setLoginPassword(e.target.value)
      }

      className="w-full p-4 rounded-lg border bg-white"

      />





      <button

      onClick={loginEmailPassword}

      className="w-full bg-green-700 text-white py-4 rounded-lg"

      >

      INICIAR SESIÓN

      </button>





      <button

      onClick={loginGoogle}

      className="w-full border py-4 rounded-lg"

      >

      Continuar con Google

      </button>




      </div>





      <p className="mt-8">

      ¿No tienes cuenta?{" "}


      <span

      onClick={() => setRegister(true)}

      className="text-green-700 font-bold cursor-pointer"

      >

      CREAR

      </span>


      </p>





      </>





      ) : (



      <>

      <h1 className="text-5xl font-black mb-4">

      REGISTRO

      </h1>



      <div className="space-y-5">



      <input

      placeholder="Nombre"

      value={nombre}

      onChange={(e)=>
      setNombre(e.target.value)
      }

      className="w-full p-4 rounded-lg border"

      />



      <input

      placeholder="Correo"

      value={correo}

      onChange={(e)=>
      setCorreo(e.target.value)
      }

      className="w-full p-4 rounded-lg border"

      />




      <input

      type="password"

      placeholder="Contraseña"

      value={password}

      onChange={(e)=>
      setPassword(e.target.value)
      }

      className="w-full p-4 rounded-lg border"

      />





      <input

      type="password"

      placeholder="Confirmar contraseña"

      value={confirmar}

      onChange={(e)=>
      setConfirmar(e.target.value)
      }

      className="w-full p-4 rounded-lg border"

      />





      <button

      onClick={registrar}

      className="w-full bg-green-700 text-white py-4 rounded-lg"

      >

      REGISTRARSE

      </button>



      </div>





      </>

      )}



      </div>


      </div>


    </div>


    </>

  );

}



export default Login;