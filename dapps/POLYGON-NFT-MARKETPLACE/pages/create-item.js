import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import axios from 'axios';
import FormData from 'form-data';

const fs = require('fs');
const authToken = fs.readFileSync(".token").toString().trim() || "01234567890123456789";


import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()


  async function uploadFileToZDFS(file) {
    
    const url = `https://app.zeeve.io/zdfs-api/api/v1/file/upload`

    //making axios POST request to ZDFS
    
    let data = new FormData();
    
    // for zdfs

    data.append('files', file);
    data.append('name', file.name);
    data.append('isDirectory', "false");

    

    return axios 
        .post(url , data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(function (response) {
           console.log("image uploaded", response.data.data.fileCID)
            return {
              success: true,
              fileURL: "https://app.zeeve.io/zdfs-gateway/ZDFS/"+ response.data.data.fileCID
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
  }

  async function uploadJSONToZDFS(JSONBody) {
    
    // Create a new File object
    const myFile = new File([JSON.stringify(JSONBody)], `${JSONBody.name}.json`, {
         type: 'application/json',
         lastModified: new Date(),
    });
 
    return uploadFileToZDFS(myFile);
     
 };

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      
      const uploadResponse = await uploadFileToZDFS(file)

      if (uploadResponse.success) {
        console.log("fileURL ===> ", uploadResponse.fileURL);
        setFileUrl(uploadResponse.fileURL)
      } else {
        throw uploadResponse.message;
      }

      
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return

    const JSONBody = {
      name, description, image: fileUrl
    };

    try {
      const uploadJSONResponse = await uploadJSONToZDFS(JSONBody)

      if (uploadJSONResponse.success) {
        /* after file is uploaded to ZDFS, pass the URL to save it on Polygon */
        console.log("uploadJSONResponse fileURL ===> ", uploadJSONResponse.fileURL)
        createSale(uploadJSONResponse.fileURL)
      } else {
        throw uploadJSONResponse.message;
      }
      
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
  )
}