export const mockBlogs = [
  {
    id: "1",
    title: "Tóm tắt nghiên cứu và các phát hiện chính về thành công",
    excerpt:
      "Thành công là một khái niệm đa chiều, bao gồm thành đạt về tài chính, sức khỏe thể chất và tinh thần, hạnh phúc và trải nghiệm sống phong phú.",
    content: `<h2>1. Tóm tắt nghiên cứu và các phát hiện chính</h2>

<p>Thành công là một khái niệm đa chiều, bao gồm thành đạt về tài chính, sức khỏe thể chất và tinh thần, hạnh phúc và trải nghiệm sống phong phú. Nhiều nghiên cứu thực nghiệm đã chỉ ra rằng tâm lý cá nhân, hành vi/thói quen hằng ngày và môi trường xung quanh đều ảnh hưởng mạnh mẽ đến mức độ thành công của mỗi người. Về tâm lý, những người có tư duy phát triển (growth mindset) và động lực nội tại cao thường kiên trì hơn trước khó khăn và đạt thành tích tốt hơn.</p>

<p>Về hành động, các thói quen lành mạnh và kỷ luật (như liên tục học hỏi, rèn luyện sức khỏe, quản lý thời gian hiệu quả) có quan hệ mật thiết với thành công lâu dài. Bên cạnh đó, môi trường xã hội đóng vai trò quan trọng: Sự hỗ trợ từ gia đình, bạn bè và cộng đồng có thể thúc đẩy cá nhân phát triển, trong khi môi trường tiêu cực có thể kìm hãm tiến bộ. Đặc biệt, các mối quan hệ chất lượng cao được chứng minh là yếu tố dự báo mạnh mẽ về cuộc sống hạnh phúc và khỏe mạnh hơn cả yếu tố giàu nghèo hay IQ.</p>

<p>Cuối cùng, yếu tố may mắn cũng góp phần không nhỏ: Nghiên cứu mô phỏng cho thấy yếu tố ngẫu nhiên (cơ hội tình cờ) giải thích phần đáng kể sự khác biệt giữa những người cực kỳ thành công so với phần còn lại. Tuy nhiên, điểm mấu chốt là hầu hết những yếu tố trên đều có thể kiểm soát hoặc cải thiện ở một mức độ nào đó. Bằng cách rèn luyện tư duy tích cực, hình thành thói quen tốt và xây dựng môi trường sống/làm việc thuận lợi, một người có thể vươn lên khỏi sự tầm thường và tiến gần hơn đến thành công toàn diện trong cuộc sống.</p>`,
    author: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      role: "Researcher",
    },
    publishedAt: "2023-08-15T10:30:00Z",
    categories: ["Research", "Success", "Psychology"],
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    likes: 124,
    comments: [
      {
        id: "c1",
        author: {
          name: "Maria Garcia",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
        },
        content:
          "Bài viết rất hay và đầy đủ thông tin. Tôi đặc biệt thích phần phân tích về tư duy phát triển!",
        createdAt: "2023-08-16T14:25:00Z",
      },
      {
        id: "c2",
        author: {
          name: "John Smith",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        },
        content:
          "Tôi đã áp dụng một số thói quen được đề cập và thấy sự thay đổi rõ rệt. Cảm ơn vì bài viết hữu ích!",
        createdAt: "2023-08-17T09:15:00Z",
      },
    ],
    readTime: "10 min read",
  },
  {
    id: "2",
    title:
      "Phân tích yếu tố tâm lý: Tư duy phát triển, động lực, kiên trì, sáng tạo",
    excerpt:
      "Tư duy phát triển (growth mindset) là niềm tin rằng khả năng và trí tuệ có thể được rèn luyện qua nỗ lực và học hỏi.",
    content: `<h2>2. Phân tích yếu tố tâm lý: Tư duy phát triển, động lực, kiên trì, sáng tạo</h2>

<p><strong>Tư duy phát triển (growth mindset):</strong> Đây là niềm tin rằng khả năng và trí tuệ có thể được rèn luyện qua nỗ lực và học hỏi. Người có tư duy phát triển không ngại thử thách, xem thất bại là bài học. Các thí nghiệm do Carol Dweck và cộng sự thực hiện cho thấy học sinh được rèn tư duy phát triển có xu hướng đạt điểm cao hơn và kiên trì hơn khi gặp bài khó. Cụ thể, trong một nghiên cứu, nhóm học sinh được dạy rằng não bộ có thể phát triển khi luyện tập đã đạt điểm kiểm tra cao hơn đáng kể so với nhóm đối chứng. Tư duy phát triển giúp cá nhân linh hoạt hơn trước trở ngại, tin rằng mình có thể tiến bộ, nhờ đó họ dám đặt mục tiêu lớn và bền bỉ theo đuổi mục tiêu.</p>

<p><strong>Động lực nội tại và đam mê:</strong> Động lực làm việc xuất phát từ bên trong – ví dụ như niềm đam mê, hứng thú hoặc ý nghĩa của công việc – được chứng minh là tạo ra hiệu quả cao hơn so với động lực bên ngoài (tiền bạc, phần thưởng). Những người làm việc vì yêu thích công việc có xu hướng kiên trì hơn và gắn bó hơn ngay cả khi không có phần thưởng tức thời. Ngược lại, nếu chỉ làm vì ép buộc hoặc phần thưởng bên ngoài, động lực có thể phai nhạt nhanh chóng. Nghiên cứu trên lính cứu hỏa cho thấy khi vừa có động lực vị tha vừa có động lực nội tại cao, họ sẵn sàng làm thêm giờ nhiều hơn đáng kể so với người khác (thể hiện tính kiên trì vượt trội). Đam mê còn tạo ra trạng thái "dòng chảy" (flow) – giúp làm việc tập trung và sáng tạo. Nói cách khác, động lực nội tại giúp duy trì năng lượng và sự tận tâm cần thiết để đạt thành công dài hạn.</p>

<p><strong>Kiên trì và "grit":</strong> Kiên trì được hiểu là khả năng bền bỉ theo đuổi mục tiêu dài hạn, không bỏ cuộc ngay cả khi gặp chướng ngại. Nhà tâm lý Angela Duckworth gọi đây là "grit" – sự kết hợp giữa đam mê và sự bền bỉ. Nghiên cứu dài hạn tại Học viện Quân sự West Point cho thấy chỉ số grit là yếu tố dự báo mạnh việc một học viên có vượt qua khóa huấn luyện khắc nghiệt hay không – thậm chí quan trọng hơn cả điểm số hay thể lực trong giai đoạn huấn luyện ban đầu. Cụ thể, những học viên "gan lì" hơn thì ít bỏ cuộc hơn trong giai đoạn huấn luyện gian khổ. Tuy trí thông minh giúp đạt điểm tốt trong lớp, nhưng về tổng thể 4 năm, nghiên cứu mega-analysis với hơn 11.000 học viên cho thấy grit và năng lực thể chất ảnh hưởng lớn hơn đến khả năng tốt nghiệp West Point so với năng lực trí tuệ đơn thuần.</p>

<p><strong>Tính sáng tạo:</strong> Sáng tạo giúp con người nghĩ ra giải pháp mới, thích nghi với hoàn cảnh thay đổi và tạo ra giá trị độc đáo – tất cả đều góp phần vào thành công. Nghiên cứu về sáng tạo và thành công sự nghiệp cho thấy sáng tạo và tính kiên cường là hai đặc điểm nổi bật ở những người đạt thành tựu nghề nghiệp cao. Sự sáng tạo cho phép cá nhân tìm ra hướng đi mới, đôi khi "đi đường vòng" để vượt qua đối thủ và đạt mục tiêu trong xã hội cạnh tranh.</p>`,
    author: {
      name: "Maria Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      role: "Psychologist",
    },
    publishedAt: "2023-09-05T14:45:00Z",
    categories: ["Psychology", "Mindset", "Motivation"],
    coverImage:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80",
    likes: 98,
    comments: [
      {
        id: "c3",
        author: {
          name: "Alex Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        },
        content:
          "Phân tích rất sâu sắc về tư duy phát triển. Tôi đã đọc nhiều nghiên cứu của Carol Dweck và thấy rằng việc áp dụng tư duy này thực sự có tác động lớn.",
        createdAt: "2023-09-06T10:20:00Z",
      },
    ],
    readTime: "8 min read",
  },
  {
    id: "3",
    title:
      "Phân tích yếu tố hành động: Thói quen, chiến lược làm việc hiệu quả",
    excerpt:
      "Nếu tâm lý là nền móng thì hành động cụ thể hàng ngày chính là những viên gạch xây nên thành công.",
    content: `<h2>3. Phân tích yếu tố hành động: Thói quen, chiến lược làm việc hiệu quả</h2>

<p>Nếu tâm lý là nền móng thì hành động cụ thể hàng ngày chính là những viên gạch xây nên thành công. Nhiều nghiên cứu cho thấy thói quen hàng ngày có ảnh hưởng cộng dồn cực kỳ lớn – khoảng 40% thời gian trong ngày của chúng ta là thực hiện thói quen tự động. Vì vậy, những người thành công thường thiết lập cho mình các thói quen và chiến lược làm việc hiệu quả, kỷ luật. Dưới đây là các hành vi nổi bật:</p>

<p><strong>Thói quen đọc và học suốt đời:</strong> Liên tục học hỏi là điểm chung quan trọng. Nghiên cứu thói quen của 177 triệu phú tự thân cho thấy 88% người giàu dành ít nhất 30 phút mỗi ngày để đọc sách tự giáo dục hoặc nâng cao bản thân, trong khi chỉ 2% người thu nhập thấp làm điều này. Họ thường đọc sách chuyên môn, tiểu sử người thành đạt hoặc sách phát triển bản thân thay vì đọc để giải trí đơn thuần. Việc đọc và học thường xuyên giúp họ tích lũy kiến thức, ý tưởng mới và duy trì tư duy sắc bén, qua đó tạo lợi thế trong sự nghiệp. Trái lại, người kém thành công có xu hướng dành nhiều thời gian giải trí thụ động: 77% những người gặp khó khăn tài chính thừa nhận xem TV hơn 1 giờ mỗi ngày (thậm chí 78% thường xem chương trình thực tế), trong khi 67% người giàu giới hạn việc xem TV dưới 1 giờ. Họ ưu tiên thời gian cho học tập hoặc các hoạt động sinh lợi khác thay vì tiêu tốn vào giải trí không mục đích.</p>

<p><strong>Rèn luyện sức khỏe và năng lượng:</strong> Sức khỏe tốt là nền tảng cho hiệu suất làm việc cao. 76% người thành công duy trì thói quen tập aerobics (bài tập tăng nhịp tim như chạy, đạp xe) ít nhất 4 ngày mỗi tuần, so với chỉ 23% ở nhóm thu nhập thấp. Tập thể dục không chỉ tăng cường thể lực mà còn cải thiện chức năng não bộ: vận động giúp hình thành tế bào não mới và tăng cường cung cấp glucose – "nhiên liệu" cho não. Nói cách khác, thói quen vận động đều đặn giúp họ có tinh thần minh mẫn và sức bền để làm việc hiệu quả hơn. Ngoài ra, người thành công cũng chú trọng các thói quen lành mạnh khác như ngủ đủ giấc, ăn uống điều độ. Họ coi giấc ngủ, dinh dưỡng như nguồn năng lượng cần được nạp đầy – "Ngủ để phục hồi, ăn để tiếp nhiên liệu" thay vì bỏ ngủ cày cuốc. Nhờ đó, họ hiếm khi kiệt sức và luôn sẵn sàng cho công việc.</p>

<p><strong>Quản lý thời gian và hiệu suất làm việc:</strong> Người thành công thường áp dụng các chiến lược làm việc hiệu quả và kỷ luật. Ví dụ, nhiều người có thói quen thức dậy rất sớm: gần một nửa số triệu phú tự thân thức dậy sớm hơn 3 giờ trước giờ làm việc để dành thời gian cho các mục tiêu quan trọng trong ngày. Việc thức dậy lúc 5 giờ sáng để tập trung hoàn thành 3 việc quan trọng nhất giúp họ "giành lại quyền kiểm soát cuộc sống" thay vì bị cuốn theo sự vụ hàng ngày. Thói quen này phù hợp với nghiên cứu của Harvard Business Review – những người hoạt động năng suất vào buổi sáng thường có sự nghiệp thành công hơn.</p>`,
    author: {
      name: "David Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      role: "Productivity Coach",
    },
    publishedAt: "2023-10-12T09:15:00Z",
    categories: ["Productivity", "Habits", "Success"],
    coverImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    likes: 156,
    comments: [
      {
        id: "c4",
        author: {
          name: "Sarah Williams",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        },
        content:
          "Tôi đã bắt đầu thức dậy sớm hơn và thấy hiệu quả công việc tăng lên đáng kể. Cảm ơn vì những chia sẻ hữu ích!",
        createdAt: "2023-10-13T16:40:00Z",
      },
      {
        id: "c5",
        author: {
          name: "Michael Brown",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
        },
        content:
          "Thói quen đọc sách mỗi ngày đã thay đổi cuộc sống của tôi. Tôi đã học được rất nhiều kiến thức mới và áp dụng vào công việc.",
        createdAt: "2023-10-14T11:30:00Z",
      },
    ],
    readTime: "12 min read",
  },
  {
    id: "4",
    title:
      "Phân tích yếu tố môi trường: Môi trường xã hội, ảnh hưởng cộng đồng",
    excerpt:
      "Con người không tồn tại trong chân không – môi trường xung quanh tác động mạnh đến hành vi và cơ hội của mỗi cá nhân.",
    content: `<h2>4. Phân tích yếu tố môi trường: Môi trường xã hội, ảnh hưởng cộng đồng, xây dựng môi trường thuận lợi</h2>

<p>Con người không tồn tại trong chân không – môi trường xung quanh tác động mạnh đến hành vi và cơ hội của mỗi cá nhân. Các nghiên cứu chỉ ra rằng con đường thành công hay tầm thường một phần được định hình bởi những người ta kết giao và không gian ta sống/làm việc.</p>

<p><strong>Ảnh hưởng của mạng lưới xã hội:</strong> "Gần mực thì đen, gần đèn thì sáng." Khoa học hiện đại cũng đồng tình với tục ngữ này. Nghiên cứu trên 12.000 người trong 32 năm cho thấy nếu một người bạn thân của bạn bị béo phì, khả năng bạn bị béo phì tăng 57% – dù hai người ở cách xa nhau. Hiệu ứng lây lan này không chỉ giới hạn ở cân nặng: hành vi hút thuốc, thói quen ăn uống, thậm chí tâm trạng (hạnh phúc hoặc trầm cảm) đều có thể lan truyền trong mạng lưới bạn bè theo thời gian. Nói cách khác, bạn chịu ảnh hưởng rất lớn từ nhóm người mà bạn thường xuyên tiếp xúc. Nếu bạn ở trong một nhóm bạn toàn người cầu tiến, làm việc chăm chỉ, bạn cũng được khích lệ noi theo. Trái lại, nếu xung quanh là những người bi quan, thiếu định hướng, bạn dễ bị kéo xuống hoặc tự mãn với hiện trạng.</p>

<p><strong>Sức mạnh của cộng đồng và quan hệ yếu (weak ties):</strong> Không chỉ bạn thân, những mối quan hệ xã hội rộng hơn cũng mở ra cơ hội bất ngờ. Nhà xã hội học Mark Granovetter phát hiện ra rằng những mối quan hệ xã giao (không quá thân thiết) lại giúp ta kiếm việc và thăng tiến nhiều hơn quan hệ thân quen. Nghiên cứu gần đây với dữ liệu của 20 triệu người dùng LinkedIn đã xác nhận điều này: các kết nối "yếu" trên mạng nghề nghiệp giúp tăng đáng kể khả năng có việc làm mới so với các kết nối "mạnh". Lý do là người quen biết rộng rãi sẽ đưa ta đến với những thông tin, cơ hội nằm ngoài vòng kết nối thân thuộc của ta. Ví dụ, một người bạn xã giao có thể giới thiệu bạn với một đối tác kinh doanh tiềm năng hoặc mách bạn về vị trí tuyển dụng mà công ty bạn ấy đang cần – những thứ mà bạn bè thân có thể không mang lại nếu họ cùng chung môi trường với bạn.</p>

<p><strong>Văn hóa và môi trường làm việc:</strong> Môi trường cũng bao gồm văn hóa tổ chức và xã hội xung quanh bạn. Một môi trường nơi mọi người ủng hộ học hỏi, thử thách sẽ thúc đẩy cá nhân phát triển. Chẳng hạn, Carol Dweck nhận thấy chương trình đào tạo tư duy phát triển cho học sinh chỉ đạt hiệu quả cao nhất khi giáo viên và nhà trường cũng khuyến khích tinh thần cầu tiến, dám thử thách. Điều này gợi ý rằng để nuôi dưỡng tư duy tích cực và hiệu suất, bạn nên tìm hoặc tạo một môi trường "thuận": chọn công ty có văn hóa học hỏi, kết bạn với những người động viên nhau tiến bộ, hoặc đơn giản là tạo một không gian làm việc ít xao nhãng.</p>`,
    author: {
      name: "Emily Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      role: "Social Researcher",
    },
    publishedAt: "2023-11-20T13:20:00Z",
    categories: ["Environment", "Social Network", "Community"],
    coverImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    likes: 87,
    comments: [],
    readTime: "9 min read",
  },
  {
    id: "5",
    title: "May mắn: Nó hoạt động thế nào và có thể tối ưu hóa ra sao?",
    excerpt:
      'Thành ngữ có câu: "Thiên thời, địa lợi, nhân hòa." Yếu tố "thiên thời" – tức may mắn hoặc yếu tố ngẫu nhiên – thường được nhắc tới trong câu chuyện thành công.',
    content: `<h2>5. May mắn: Nó hoạt động thế nào và có thể tối ưu hóa ra sao?</h2>

<p>Thành ngữ có câu: "Thiên thời, địa lợi, nhân hòa." Yếu tố "thiên thời" – tức may mắn hoặc yếu tố ngẫu nhiên – thường được nhắc tới trong câu chuyện thành công. Vậy may mắn vận hành ra sao, và liệu ta có thể tăng cơ hội gặp may cho mình không?</p>

<p><strong>Vai trò của may mắn trong thành công:</strong> Nghiên cứu khoa học cho thấy vận may đóng vai trò lớn hơn ta tưởng. Một nghiên cứu mô phỏng nổi tiếng năm 2018 (Pluchino và cs.) đã tạo ra mô hình giả lập hàng trăm con người với mức tài năng khác nhau và cho họ gặp các sự kiện ngẫu nhiên tốt/xấu trong 40 năm sự nghiệp. Kết quả mô phỏng hết sức bất ngờ: Người thành công nhất không phải người tài năng nhất, mà là người tài năng vừa phải nhưng gặp nhiều sự kiện may mắn nhất. Thậm chí trong mô phỏng đó, cá nhân xuất sắc nhất chỉ có mức tài năng hơi trên trung bình nhưng tích lũy được nhiều "vận may", còn người tài năng nhất lại hầu như không gặp may nên thành quả rất thấp. Nghiên cứu kết luận: ngoài tài năng và nỗ lực, may mắn ngẫu nhiên chính là nhân tố phân tách những người "cực kỳ thành công" khỏi số đông. Điều này không phủ nhận vai trò của tài năng, nhưng nhắc nhở rằng ngay cả người rất giỏi cũng cần những cơ hội tình cờ (gặp đúng quý nhân, đúng thời điểm thị trường, v.v.) mới đạt đỉnh cao.</p>

<p><strong>Tối ưu hóa may mắn – "gặp may có kỹ thuật":</strong> Nếu may mắn quan trọng như vậy, liệu ta có cách nào "gặp may" nhiều hơn? Nhà tâm lý Richard Wiseman đã nghiên cứu hàng trăm người tự nhận cực kỳ may mắn hoặc cực kỳ xui xẻo để tìm ra khác biệt. Kết luận của ông: Người "may mắn" thường tạo ra và nắm bắt cơ hội ngẫu nhiên tốt hơn người "xui". Ông đúc kết 4 nguyên tắc của mindset may mắn:</p>

<ol>
<li><strong>Chủ động tạo ra và nhận biết cơ hội:</strong> Người may mắn kết giao rộng và cởi mở hơn, nhờ đó xác suất gặp những cơ hội bất ngờ cao hơn. Họ có thái độ thoải mái, cởi mở với trải nghiệm mới – ví dụ sẵn sàng tham gia một sự kiện lạ, thử một sở thích mới hoặc nói chuyện với người lạ. Trong khi đó, người kém may mắn thường thu hẹp vòng quan hệ hoặc lặp lại lối mòn, nên ít tiếp xúc với cái mới. Nói đơn giản, muốn gặp cơ hội lớn, hãy ra khỏi vùng an toàn và xuất hiện ở nhiều "ngã rẽ" hơn. Cơ hội giống như vé số: bạn mua nhiều vé (tích cực hoạt động, gặp gỡ) thì khả năng trúng cao hơn.</li>

<li><strong>Lắng nghe trực giác và nhạy bén nắm bắt thời cơ:</strong> Wiseman nhận thấy người may mắn hay tin vào linh cảm của họ – thật ra đó là sự nhạy bén do kinh nghiệm tích lũy. Khi cơ hội xuất hiện thoáng qua, họ nhanh chóng hành động theo "gut feeling" trước khi nó trôi qua. Trái lại, người do dự phân tích quá lâu có thể bỏ lỡ vận may. Tất nhiên không phải linh cảm lúc nào cũng đúng, nhưng việc rèn luyện trực giác (qua trải nghiệm đa dạng, qua rút kinh nghiệm thành bại) sẽ giúp bạn ra quyết định kịp thời khi thời cơ đến.</li>

<li><strong>Giữ thái độ tích cực, kỳ vọng điều tốt:</strong> Người may mắn có niềm tin rằng mình sẽ gặp may, và điều này trở thành tự ứng nghiệm tích cực. Vì lạc quan, họ dám đặt mục tiêu lớn và kiên trì ngay cả khi xác suất thành công thấp. Họ cũng nhìn mọi việc với góc nhìn tốt: trong thất bại, họ tìm thấy bài học hoặc cái may trong cái rủi, thay vì chìm đắm trong vận xui. Nhờ đó, họ không ngừng nỗ lực và tận dụng được các cơ hội dù nhỏ nhất. Ngược lại, người bi quan nghĩ mình "đen đủi" dễ bỏ cuộc sớm hoặc thậm chí không nhận ra cơ hội trước mắt. Thái độ kì vọng tích cực còn giúp họ thu hút được sự giúp đỡ – người khác thường thích ở cạnh năng lượng tích cực và sẵn sàng hỗ trợ, qua đó lại tạo thêm "vận may".</li>

<li><strong>Biến rủi thành may:</strong> Điểm khác biệt lớn nữa là người may mắn biết ứng biến khi gặp xui xẻo. Họ không than vãn lâu về vận rủi, thay vào đó nhanh chóng tìm cách xoay chuyển tình thế. Ví dụ, nếu lỡ lạc đường họ có thể khám phá ra địa điểm thú vị mới; nếu trượt phỏng vấn, họ xem đó là kinh nghiệm để phỏng vấn lần sau tốt hơn. Wiseman thấy người may mắn luôn tin điều xấu xảy ra vẫn có cái tốt ẩn sau, và niềm tin đó giúp họ bền bỉ và tỉnh táo hành động cho đến khi vận may mỉm cười trở lại. Kết hợp với thái độ lạc quan, họ coi thất bại chỉ là bước đệm, nhờ vậy ít bị nhụt chí.</li>
</ol>

<p>Tóm lại, may mắn không hoàn toàn ngẫu nhiên – nó chịu ảnh hưởng bởi cách ta tiếp cận cuộc sống. "May mắn = Cơ hội + Sẵn sàng". Ta không kiểm soát được khi nào cơ hội đến, nhưng ta kiểm soát được việc tăng số lượng cơ hội (qua mở rộng mạng lưới, trải nghiệm mới) và chuẩn bị tốt để nắm bắt chúng (qua trau dồi kỹ năng, kiến thức và trực giác nhạy bén). Bằng cách áp dụng các nguyên tắc trên, một người có thể tối ưu hóa vận may của mình: Gặp nhiều cơ hội hơn và chuyển hóa được nhiều cơ hội thành thành công thực sự. Đây chính là cách "thoạt nhìn có vẻ may mắn", nhưng thực ra là có chiến lược mà nhiều doanh nhân và nhà sáng tạo áp dụng.</p>`,
    author: {
      name: "Robert Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
      role: "Fortune Researcher",
    },
    publishedAt: "2023-12-05T11:10:00Z",
    categories: ["Luck", "Opportunity", "Success"],
    coverImage:
      "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80",
    likes: 112,
    comments: [
      {
        id: "c6",
        author: {
          name: "Lisa Thompson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
        },
        content:
          "Tôi luôn tin rằng may mắn là khi cơ hội gặp sự chuẩn bị. Bài viết này đã xác nhận niềm tin đó của tôi!",
        createdAt: "2023-12-06T15:55:00Z",
      },
    ],
    readTime: "11 min read",
  },
];
