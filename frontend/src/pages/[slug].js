import React from 'react';
import Head from "next/head";
import {Image} from "@nextui-org/react";
import styles from "@/src/styles/Detail.module.css";
import Link from "next/link";
import dateFormat from "dateformat";
import { useState } from 'react';
import {FaCheckCircle} from "react-icons/fa"
import { useRouter } from "next/router";
import { FaEdit } from 'react-icons/fa';
import Header from '@/src/components/Header';

export default function Campaign({data}) {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const[email, setEmail] = useState('');
    const router = useRouter();

    const handleEditClick = () => {
        router.push(`/editcampaign?slug=${data.slug}`);
      };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
    
        const options = {
            method: "POST",
            body: JSON.stringify({
                email,
                Campaign: data.id, // Adjust this value as needed
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    
        setSubmitting(true);
    
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            return response.json();
        })
        .then(responseData => {
            setSubmitted(true); // Assuming success means the submission is complete
        })
        .catch(err => {
            console.error('Error:', err.message);
            // Handle the error, e.g., display an error message to the user
        })
        .finally(() => {
            setSubmitting(false);
        });
    };
    
  
  
    return (
    <div><Head>

        <title>{data.title}</title>
        <meta name="description" content={data.description} />

    </Head>
    <Header/>
    
    <div className={styles.wrapper}>
        
        <div className={styles.main}>
            </div>
                <div className={styles.content}>
                        <div className={styles.grid}>
                             <div className={styles.left}>
                             <img
                        className={styles.img}
                        src={
                            "https://res.cloudinary.com/dzplxvf5r/" + data.logo
                        }
                        alt="Campaign Banner"
                    />
                                <FaEdit className={styles.editIcon} onClick={handleEditClick} title="Edit Campaign" />
                                <h1 className={styles.title}>{data.title}</h1>
                                <p className={styles.description}>{data.description.substring(0, 1000)}</p>
                                <p className={styles.date}>Created at: {dateFormat(new Date(data.created_at),"dddd, mmmm, dS, yyyy, h:MM:ss TT")}</p>
                            </div>
                            
                            <div className={styles.right}>
                                
                                {!submitted?<div className={styles.rightContent}>
                                <h1 className={styles.title} style={{marginBottom:'1em'}}>Subscribe to the CAMPAIGN</h1>
                                    <form onSubmit={handleOnSubmit}>
                                        <div className={styles.formGroup}>
                                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name='email' placeholder='Enter your email' className={styles.input}/>
                                        </div>
                                        
                                        <div className={styles.submit}>
                                        <input type='submit' value={submitting ? "Submitting..." : "Subscribe"} disabled={submitting} className={styles.btn}/>
                                        </div>

                                    </form>
                                </div>:<div className={styles.thankyou}>
                                        <div className={styles.icon}>
                                            <FaCheckCircle size={17} color='green'/>
                                        </div>
                                        <div className={styles.message}>
                                        Thank you for subscribing
                                        </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export async function getStaticPaths(){
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`);

    const data = await response.json();

    const allSlugs = data.map(element => element.slug)

    const paths= allSlugs.map(slug => ({params: {slug: slug}}))

return {paths, fallback: false}
}

export async function getStaticProps({params}) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns/${params.slug}`);

    const data = await response.json();

    return { props: { data } }
    
}
