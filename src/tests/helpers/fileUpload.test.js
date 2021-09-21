
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'christiancdnary',
  api_key: '666966891824233',
  api_secret: 'KBAG2UWI3Snv-fW5YX4ICQxU7RE'
});


describe('fileUpload.js', () => {
  test('should load file and return url', async () => {
    const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'image.png');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');
    // delete image by id
    const segments = url.split('/')
    const imageId = segments[segments.length -1].replace('.png', '');
    const res = await cloudinary.v2.api.delete_resources(imageId, {}, () => {} )
    expect(res?.deleted[imageId]).toBe('deleted');
  })

  test('should return error', async () => {
     const file = new File([], 'image.png');
     const url = await fileUpload(file);
     expect(url).toBe(null);
  })

})
