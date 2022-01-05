import { gql } from 'apollo-angular';
import { seoFragment } from './seo';
import { signUpFragment, signUpSection } from './sign-up';

export const getLandingPageQuery = gql`
    query queryLandingPageContents {
        queryLandingPageContents {
            flatData {
                helpSection {
                    flatData {
                        cards {
                            content
                            customClasses
                            imgAlt
                            imgTitle
                            title
                            img {
                                url
                            }
                        }
                        title
                    }
                }
                carouselReferences {
                    flatData {
                        city
                        imgAlt
                        name
                        reference
                        img {
                            url
                        }
                    }
                }
                howItWorksSection {
                    flatData {
                        buttonText
                        description
                        title
                        steps {
                            description
                            title
                        }
                    }
                }
                bestPricesInTheWorldSection {
                    flatData {
                        buttonText
                        title
                        carouselDiscount {
                            flatData {
                                countingDescription
                                description
                                perex
                                title
                                prices {
                                    description
                                    discount
                                    title
                                }
                            }
                        }
                    }
                }
                seo {
                    ...seoFragment
                }
                aboutUs {
                    flatData {
                        title
                        buttonText
                        chatText
                        bigText
                        description
                        logos {
                            alt
                            faq {
                                flatData {
                                    tag {
                                        flatData {
                                            url
                                        }
                                    }
                                    url
                                }
                            }
                            logo {
                                url
                            }
                            title
                            width
                        }
                    }
                }
                iWantToSeeTheBestOffers {
                    flatData {
                        buttonText
                        title
                    }
                }
            }
        }
        queryAskForOfferContents {
            flatData {
                firstStep
                secondStep
                title
            }
        }
        queryArticleContents(
            filter: "data/oneOfMostVisited/iv eq true"
            top: 3
            orderby: "data/date/iv desc"
        ) {
            flatData {
                content
                header
                img {
                    url
                }
                type {
                    flatData {
                        url
                    }
                }
                oneOfMostVisited
                url
                date
            }
        }
        ${signUpSection}
    }
    ${seoFragment}${signUpFragment}
`;
