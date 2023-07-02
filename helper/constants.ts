export const fallBackImgUrl =
  'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

export const url = '';
export const getCurrentUrl = (url: string) => {
  if (typeof window !== 'undefined') {
    url = window.location.href;
    return url;
  }
};
