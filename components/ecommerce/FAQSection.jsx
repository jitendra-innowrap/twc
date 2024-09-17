import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { useEffect, useState } from "react";
import { BiChevronDown, BiMinus, BiMinusCircle, BiPlus, BiPlusCircle } from "react-icons/bi";
import { getFaqs } from "../../util/api";
import { Html } from "next/document";

/**
 * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
 */
const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <BiPlus className="plus" alt="Chevron Down" />
        <BiMinus className="minus" alt="Chevron Down" />
      </>
    }
    className={'item'}
    buttonProps={{
      className: ({ isEnter }) =>
        `${'itemBtn'} ${isEnter && 'itemBtnExpanded'}`,
    }}
    contentProps={{ className: 'itemContent' }}
    panelProps={{ className: 'itemPanel' }}
  />
);

export default function FAQ() {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        fetchFaq();
    }, [])
    
    const fetchFaq= async()=>{
        try {
            const res = await getFaqs()
            if(res.code==1){
                setFaqs(res.result ||[]);
            }
        } catch (error) {
            console.error(error);
        }
        
    }
  return (
    <div>
      <div className={'faq-wrapper'}>
        {/* `transitionTimeout` prop should be equal to the transition duration in CSS */}
        <Accordion transition transitionTimeout={250}>
            {
                faqs.map((faq, i)=>{
                    return <AccordionItem key={faq.id} header={faq.title}>
                            <div dangerouslySetInnerHTML={{ __html: faq.description }}></div>
                            </AccordionItem>
                })
            }
        

    {/* <AccordionItem header="How far in advance should I book my event?">
      <p>
        We recommend booking your event as early as possible, especially for
        popular dates and seasons. Many of our venues book up several months in
        advance, so the sooner you can secure your date, the better.
      </p>
    </AccordionItem>

    <AccordionItem header="Do you have any discounts or packages available?">
      <p>
        Yes, we offer various discounts and package deals depending on the size,
        duration, and type of your event. Please let our team know your
        requirements, and we can provide customized pricing options.
      </p>
    </AccordionItem>

    <AccordionItem header="Can I bring in my own catering and alcohol?">
      <p>
        For most of our venues, you are welcome to bring in your own catering
        and alcohol. However, there may be some restrictions or additional
        fees, so please check with our team for the specific details.
      </p>
    </AccordionItem>

    <AccordionItem header="What is included in the venue rental fee?">
      <p>
        The venue rental fee typically includes the use of the event space,
        tables, chairs, and basic AV equipment. Additional services like
        catering, decorations, and staffing can be added for an extra cost.
      </p>
    </AccordionItem>

    <AccordionItem header="Do you have on-site parking available?">
      <p>
        Yes, most of our venues have on-site parking available for your guests.
        Some may have a limited number of spaces, so we recommend informing us
        of your expected attendance so we can ensure adequate parking.
      </p>
    </AccordionItem>

    <AccordionItem header="Can I hold a site visit before booking?">
      <p>
        Absolutely! We encourage all our clients to schedule a site visit to get
        a feel for the venue and ensure it meets your needs. Our team will be
        happy to show you around and answer any questions you may have.
      </p>
    </AccordionItem>

    <AccordionItem header="What is your cancellation and refund policy?">
      <p>
        Our cancellation and refund policy varies depending on the venue and the
        timing of the cancellation. Generally, we require a deposit to secure
        your booking, and this deposit may be non-refundable if you cancel
        within a certain timeframe. Please refer to our terms and conditions
        for the full details.
      </p>
    </AccordionItem> */}
        </Accordion>
      </div>
    </div>
  );
}
