import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from './ReviewModal';

const Characteristics = styled.ul`
list-style-type: none
`;

const ReviewForm = ({
  productID, writable, setisWritable, char, setDataUpdate, setSort,
}) => {
  const product_id = productID;
  const [summary, setSummary] = useState('');
  const [recommend, setRecommend] = useState('');
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [characteristics, setCharacteristics] = useState({});
  const [photos, setPhoto] = useState([]);
  const [quality, setQuality] = useState('');
  const [fit, setFit] = useState('');
  const [length, setLength] = useState('');
  const [comfort, setComfort] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = () => {
    const data = {
      product_id: Number(productID),
      rating: Number(rating),
      summary,
      body,
      recommend: Boolean(recommend),
      name,
      email,
      photos,
      characteristics,
    };
    axios.post('/reviews', data)
      .then((res) => {
        setDataUpdate(res);
        setSort('newest');
      })
      .catch();
  };
  const content = (
    <div>
      <Characteristics>
        <li>
          Overall Rating
          <div className="stars">
            <form action="" onChange={(e) => { setRating(e.target.value); }}>
              <input className="star star-5" id="star-5" type="radio" name="star" value="5" />
              <label className="star star-5" htmlFor="star-5">
                <input className="hidden" />
              </label>
              <input className="star star-4" id="star-4" type="radio" name="star" value="4" />
              <label className="star star-4" htmlFor="star-4">
                <input className="hidden" />
              </label>
              <input className="star star-3" id="star-3" type="radio" name="star" value="3" />
              <label className="star star-3" htmlFor="star-3">
                <input className="hidden" />
              </label>
              <input className="star star-2" id="star-2" type="radio" name="star" value="2" />
              <label className="star star-2" htmlFor="star-2">
                <input className="hidden" />
              </label>
              <input className="star star-1" id="star-1" type="radio" name="star" value="1" />
              <label className="star star-1" htmlFor="star-1">
                <input className="hidden" />
              </label>
            </form>
          </div>
        </li>
        <li>
          Do you recommend this product?
          <form onChange={(e) => { setRecommend(e.target.value); }}>
            <input type="radio" name="recommendation" value="true" />
            Yes
            <input type="radio" name="recommendation" value="false" />
            No
          </form>
        </li>
        <li>
          Characteristics
          <Characteristics>
            <li
              className={(!char.Size) ? 'hidden' : ''}
              onChange={(e) => {
                setCharacteristics((prev) => {
                  const sizeID = (char.Size.id).toString();
                  prev[sizeID] = Number(e.target.value);
                  return prev;
                });
              }}
            >
              Size
              <input type="radio" name="size" value="5" />
              <input type="radio" name="size" value="4" />
              <input type="radio" name="size" value="3" />
              <input type="radio" name="size" value="2" />
              <input type="radio" name="size" value="1" />
            </li>
            <li
              className={(!char.Width) ? 'hidden' : ''}
              onChange={(e) => {
                setCharacteristics((prev) => {
                  const widthID = (char.Width.id).toString();
                  prev[widthID] = Number(e.target.value);
                  return prev;
                });
              }}
            >
              Width
              <input type="radio" name="width" value="5" />
              <input type="radio" name="width" value="4" />
              <input type="radio" name="width" value="3" />
              <input type="radio" name="width" value="2" />
              <input type="radio" name="width" value="1" />
            </li>
            <li
              className={(!char.Comfort) ? 'hidden' : ''}
              onChange={(e) => {
                setCharacteristics((prev) => {
                  const comfortID = (char.Comfort.id).toString();
                  prev[comfortID] = Number(e.target.value);
                  return prev;
                });
              }}
            >
              Comfort
              <input type="radio" name="comfort" value="5" />
              <input type="radio" name="comfort" value="4" />
              <input type="radio" name="comfort" value="3" />
              <input type="radio" name="comfort" value="2" />
              <input type="radio" name="comfort" value="1" />
            </li>
            <li
              className={(!char.Quality) ? 'hidden' : ''}
              onChange={(e) => {
                setCharacteristics((prev) => {
                  const qualityID = (char.Quality.id).toString();
                  prev[qualityID] = Number(e.target.value);
                  return prev;
                });
              }}
            >
              Quality
              <input type="radio" name="quality" value="1" />
              <input type="radio" name="quality" value="2" />
              <input type="radio" name="quality" value="3" />
              <input type="radio" name="quality" value="4" />
              <input type="radio" name="quality" value="5" />
            </li>
            <li className={(!char.Length) ? 'hidden' : ''}>
              Length
              <input type="radio" name="length" value="5" />
              <input type="radio" name="length" value="4" />
              <input type="radio" name="length" value="3" />
              <input type="radio" name="length" value="2" />
              <input type="radio" name="length" value="1" />
            </li>
            <li className={(!char.Fit) ? 'hidden' : ''}>
              Fit
              <input type="radio" name="fit" value="5" />
              <input type="radio" name="fit" value="4" />
              <input type="radio" name="fit" value="3" />
              <input type="radio" name="fit" value="2" />
              <input type="radio" name="fit" value="1" />
            </li>
          </Characteristics>
        </li>
        <li>Review summary</li>
        <li>
          <input type="text" maxLength="60" placeholder="Example: Best purchase ever!" style={{ width: '90%' }} onChange={(e) => setSummary(e.target.value)} />
        </li>
        <li>Review body</li>
        <li>
          <input type="text" maxLength="1000" placeholder="Why did you like the product or not?" style={{ width: '90%', height: '100px' }} onChange={(e) => { setBody(e.target.value); }} />
        </li>
        <li>Upload your photos</li>
        <li>
          <button type="submit">
            Update
          </button>
        </li>
        <li>What is your nickname</li>
        <input type="text" maxLength="60" placeholder="Example: jackson11!" style={{ width: '90%' }} onChange={(e) => setName(e.target.value)} />
        <li>
          <p style={{
            margin: '0', fontSize: '5px', position: 'absolute', right: '10%', textAlign: 'center',
          }}
          >
            For privacy reasons, do not use your full name or email address
          </p>
        </li>
        <li>Your email</li>
        <li><input type="email" placeholder="Example: jackson11@email.com" style={{ width: '90%' }} onChange={(e) => setEmail(e.target.value)} /></li>
        <li>

          <p style={{
            margin: '0', fontSize: '5px', position: 'absolute', right: '10%', textAlign: 'center',
          }}
          >
            For authentication reasons, you will not be emailed
          </p>
        </li>

        <li>
          <button type="submit" onClick={() => { setisWritable(false); handleSubmit(); }}>
            Submit review
          </button>
        </li>
      </Characteristics>
    </div>
  );
  return (
    <div>
      <Modal title="Write A Review" content={content} onClose={setisWritable} writable={writable} />
    </div>
  );
};

export default ReviewForm;
