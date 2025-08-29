export interface BookPage {
  _id: string;
  pageNumber: number;
  imageUrl?: string;
  title: string;
  description: string;
}

export interface ArtistInfo {
  _id: string;
  name: string;
  statement: string;
  vision: string;
}

export interface Project {
  _id:string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface VideoProject {
  _id: string;
  videoUrl?: string;
  posterUrl?: string;
}

export interface FinalImage {
  _id: string;
  imageUrl?: string;
}

export interface FooterInfo {
  _id: string;
  copyright: string;
  socials: { name: string; url: string }[];
  email?: string;
}

export interface ProjectItem {
  _id: string;
  title: string;
  year: number;
  imageUrl?: string;
}

export interface ExhibitionItem {
  _id: string;
  title: string;
  venue: string;
  date: string;
  type: 'Solo' | 'Group';
}

// Represents a simple block in Sanity's Portable Text format.
// This allows us to safely handle rich text from the CMS.
interface PortableTextBlock {
  _key: string;
  _type: 'block';
  children: {
    _key: string;
    _type: 'span';
    text: string;
    marks: string[];
  }[];
  markDefs: any[];
  style: string;
}

export interface AboutInfo {
  _id: string;
  imageUrl?: string;
  bio: PortableTextBlock[]; // Changed from string[] to handle rich text
}

export interface SiteData {
    artistInfo: ArtistInfo | null;
    bookPages: BookPage[];
    nextProject: Project | null;
    videoProject: VideoProject | null;
    finalImage: FinalImage | null;
    footerInfo: FooterInfo | null;
    projectsData: ProjectItem[];
    exhibitionsData: ExhibitionItem[];
    aboutInfo: AboutInfo | null;
}