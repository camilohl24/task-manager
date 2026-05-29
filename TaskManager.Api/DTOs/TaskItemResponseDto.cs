using TaskManager.Api.Models;

namespace TaskManager.Api.DTOs;

public class TaskItemResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? AssignedTo { get; set; }
    public TaskItemStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? DueDate { get; set; }

}
